import fetch from "node-fetch";
import { Protocols } from "../../helpers";
import { PingMonitors, sendUpDownMail } from "../../../services";
import { get, set, destroy } from "../../../caching";
import LocaleKeys from "../../locales";

/* eslint-disable camelcase */

// **==========================================================================
// **                         Monitors Events ACTIONS
// **==========================================================================
const events = async (monitorsTag, monitorName, webhook, userEmail) => {
  const onDownErrorTimeout = async ({ website, address, port }) => {
    const {
      lastDownTime,
      totalRequests,
      totalDownTimes,
      state,
      ...previousValues
    } = (await get(monitorName)) || {};

    const data = {
      website,
      address,
      port,
      state: "down",
      ...previousValues,
      lastDownTime: new Date(),
      totalRequests: totalRequests ? totalRequests + 1 : 1,
      totalDownTimes: totalDownTimes ? totalDownTimes + 1 : 1,
    };

    set(monitorName, data);

    if (webhook) {
      fetch(webhook, { method: "POST", body: JSON.stringify(data) });
    }
    if ((state && state !== "down") || !previousValues) {
      sendUpDownMail(
        userEmail,
        "Server Down",
        `Monitor name: ${monitorName} - ${
          data.website || `${data.address}:${data.port}`
        }`,
        `Server state: ${data.state}<br>
            Max time: ${data.maxTime}<br>
            Min time: ${data.minTime}<br>
            Avg time: ${data.averageTime}<br>
            Total time: ${data.totalTime}<br>
            Total requests: ${data.totalRequests}<br>
            Total down times: ${data.totalDownTimes}<br>
            Total up times: ${
              new Date(data.totalRequests) - new Date(data.totalDownTimes)
            }<br>
            Total down time: ${data.totalDownTime}<br>
            Total up time: ${data.totalUpTime}<br>
            Created time:  ${new Date(data.created_at).toUTCString()}`
      );
    }
  };

  PingMonitors.onUpDown(
    monitorsTag,
    monitorName,
    "up",
    async (
      { responseTime, website, address, port },
      { totalRequests, totalDownTimes, created_at, lastRequest, lastDownTime }
    ) => {
      const previousValues = await get(monitorName);

      const isStateChanged = previousValues && previousValues.state !== "up";
      const totalTime = previousValues
        ? previousValues.totalTime + responseTime
        : responseTime;

      const data = {
        website,
        address,
        port,
        state: "up",
        maxTime:
          previousValues && previousValues.maxTime > responseTime
            ? previousValues.maxTime
            : responseTime,
        minTime:
          previousValues && previousValues.minTime < responseTime
            ? previousValues.minTime
            : responseTime,
        averageTime: totalTime / totalRequests,
        totalTime,
        totalRequests,
        totalDownTimes,
        created_at,
        lastRequest,
        lastDownTime,
        totalDownTime: isStateChanged
          ? new Date() -
            new Date(lastDownTime) +
            ((previousValues && previousValues.totalDownTime) || 0)
          : (previousValues && previousValues.totalDownTime) || 0,
        totalUpTime:
          new Date() -
          new Date(created_at) -
          ((previousValues &&
            previousValues.totalDownTime !== 0 &&
            new Date(previousValues.totalDownTime)) ||
            0),
      };

      set(monitorName, data);

      if (webhook) {
        fetch(webhook, { method: "POST", body: JSON.stringify(data) });
      }
      if (isStateChanged || !previousValues) {
        sendUpDownMail(
          userEmail,
          "Server Up",
          `Monitor name: ${monitorName} - ${
            data.website || `${data.address}:${data.port}`
          }`,
          `Server state: ${data.state}<br>
            Max time: ${data.maxTime}<br>
            Min time: ${data.minTime}<br>
            Avg time: ${data.averageTime}<br>
            Total time: ${data.totalTime}<br>
            Total requests: ${data.totalRequests}<br>
            Total down times: ${data.totalDownTimes}<br>
            Total up times: ${
              new Date(data.totalRequests) - new Date(data.totalDownTimes)
            }<br>
            Total down time: ${data.totalDownTime}<br>
            Total up time: ${data.totalUpTime}<br>
            Created time:  ${new Date(data.created_at).toUTCString()}`
        );
      }
    }
  );

  PingMonitors.onUpDown(monitorsTag, monitorName, "down", (res) => {
    onDownErrorTimeout(monitorName, res);
  });
  PingMonitors.onTimeoutError(monitorsTag, monitorName, "timeout", (res) => {
    onDownErrorTimeout(monitorName, res);
  });
  PingMonitors.onTimeoutError(monitorsTag, monitorName, "error", (res) => {
    onDownErrorTimeout(monitorName, res);
  });
};

// **==========================================================================
// **                               Monitors
// **==========================================================================
export const create = async ({ nameTag, monitors }, userEmail) => {
  try {
    const data = { monitorsTag: nameTag, monitors: [] };
    await Promise.all(
      monitors.map(async ({ webhook, ...monitor }) => {
        const { monitorsTag, monitorName, isSuccess } =
          (await PingMonitors.ping(nameTag, monitor)) || {};

        if (isSuccess) {
          data.monitors.push({ monitorName, ...monitor, webhook });

          await events(monitorsTag, monitorName, webhook, userEmail);
        }
      })
    );

    if (data.monitors.length === 0) {
      return Protocols.appResponse({ err: LocaleKeys.EXIST_MONITOR });
    }

    return Protocols.appResponse({ data });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const edit = async (monitorName, { webhook, ...monitor }, userEmail) => {
  try {
    const monitorsTag = monitorName.split("-")[0];
    const isCancelled = await PingMonitors.stop(
      monitorsTag,
      monitorName,
      destroy
    );

    if (!isCancelled) {
      return Protocols.appResponse({
        data: null,
      });
    }

    const createdPingMonitor = await PingMonitors.ping(monitorsTag, {
      monitorName,
      ...monitor,
    });

    if (createdPingMonitor) {
      await events(monitorsTag, monitorName, webhook, userEmail);
    }
    return Protocols.appResponse({
      data: { monitorName, ...monitor, webhook },
    });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const show = async (monitorName) => {
  try {
    const { created_at, lastRequest, ...rest } = (await get(monitorName)) || {};
    return Protocols.appResponse({
      data: created_at && {
        monitorName,
        ...rest,
        availability:
          ((rest.totalRequests - rest.totalDownTime) / rest.totalRequests) *
          100,
        lastRequest: new Date(lastRequest),
        createdAt: new Date(created_at),
      },
    });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};
export const showAll = async (monitorsTag) => {
  try {
    const monitors = await PingMonitors.getMonitorsByTag(monitorsTag);
    const data = [];
    if (monitors) {
      await Promise.all(
        monitors.map(async (monitorName) => {
          const { created_at, lastRequest, ...rest } =
            (await get(monitorName)) || {};
          if (created_at) {
            data.push({
              monitorName,
              ...rest,
              availability:
                ((rest.totalRequests - rest.totalDownTime) /
                  rest.totalRequests) *
                100,
              lastRequest: new Date(lastRequest),
              createdAt: new Date(created_at),
            });
          }
        })
      );
    }

    return Protocols.appResponse({ data });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const pauseResume = async (monitorName, isResume) => {
  try {
    const monitorsTag = monitorName.split("-")[0];
    const { created_at, lastRequest, ...rest } =
      (await PingMonitors.pauseResume(
        monitorsTag,
        monitorName,
        get,
        isResume
      )) || {};
    return Protocols.appResponse({
      data: created_at && {
        monitorName,
        ...rest,
        availability:
          ((rest.totalRequests - rest.totalDownTime) / rest.totalRequests) *
          100,
        lastRequest: new Date(lastRequest),
        createdAt: new Date(created_at),
      },
    });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};
export const pauseResumeAll = async (monitorsTag, isResume) => {
  try {
    const monitors = await PingMonitors.getMonitorsByTag(monitorsTag);
    const data = [];
    if (monitors) {
      await Promise.all(
        monitors.map(async (monitorName) => {
          const { created_at, lastRequest, ...rest } =
            (await PingMonitors.pauseResume(
              monitorsTag,
              monitorName,
              get,
              isResume
            )) || {};
          if (created_at) {
            data.push({
              monitorName,
              ...rest,
              availability:
                ((rest.totalRequests - rest.totalDownTime) /
                  rest.totalRequests) *
                100,
              lastRequest: new Date(lastRequest),
              createdAt: new Date(created_at),
            });
          }
        })
      );
    }

    return Protocols.appResponse({ data });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const cancel = async (monitorName) => {
  try {
    const monitorsTag = monitorName.split("-")[0];
    const { created_at, lastRequest, ...rest } =
      (await PingMonitors.stop(monitorsTag, monitorName, destroy)) || {};
    return Protocols.appResponse({
      data: created_at && {
        monitorName,
        ...rest,
        availability:
          ((rest.totalRequests - rest.totalDownTime) / rest.totalRequests) *
          100,
        lastRequest: new Date(lastRequest),
        createdAt: new Date(created_at),
      },
    });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};
export const cancelAll = async (monitorsTag) => {
  try {
    const monitors = await PingMonitors.getMonitorsByTag(monitorsTag);
    const data = [];
    if (monitors) {
      await Promise.all(
        monitors.map(async (monitorName) => {
          const { created_at, lastRequest, ...rest } =
            (await PingMonitors.stop(monitorsTag, monitorName, destroy)) || {};
          if (created_at) {
            data.push({
              monitorName,
              ...rest,
              availability:
                ((rest.totalRequests - rest.totalDownTime) /
                  rest.totalRequests) *
                100,
              lastRequest: new Date(lastRequest),
              createdAt: new Date(created_at),
            });
          }
        })
      );
    }
    return Protocols.appResponse({ data });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};
