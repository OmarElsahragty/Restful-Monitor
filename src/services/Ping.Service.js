import Monitor from "ping-monitor";
import LocaleKeys from "../app/locales/index";

class _PingMonitors {
  constructor() {
    this.monitors = {};

    this.findMonitor = (monitorsTag, monitorName) => {
      if (this.monitors[monitorsTag]) {
        const index = this.monitors[monitorsTag].findIndex(
          (monitor) => monitor.title === monitorName
        );

        return { monitor: this.monitors[monitorsTag][index], index };
      }
      return null;
    };
  }

  async ping(
    monitorsTag,
    {
      monitorName,
      website = null,
      address = null,
      port = null,
      method = "get",
      path = "/",
      query = null,
      body = null,
      headers = null,
      ignoreSSL = false,
      generateId = false,
      interval = 10,
      intervalUnits = "minutes",
      assert = { statusCode: 200 },
    }
  ) {
    const title =
      monitorName ||
      `${monitorsTag}-${website.split(".")[1] || `${address}:${port}`}`;

    const { monitor } = this.findMonitor(monitorsTag, title) || {};
    if (monitor) return null;

    const createdMonitor = new Monitor({
      website,
      address,
      port,
      httpOptions: { path, method, query, body, headers },
      config: { intervalUnits, generateId, ignoreSSL },
      expect: { statusCode: assert.statusCode },
      interval,
      title,
    });

    if (this.monitors[monitorsTag]) {
      this.monitors[monitorsTag].push(createdMonitor);
    } else {
      this.monitors[monitorsTag] = [createdMonitor];
    }

    return { monitorsTag, monitorName: title, isSuccess: true };
  }

  onUpDown(monitorsTag, monitorName, event, action) {
    const { monitor } = this.findMonitor(monitorsTag, monitorName) || {};
    if (monitor) {
      monitor.on(event, ({ httpResponse, ...res }, state) => {
        return action(res, state);
      });
    }
    return null;
  }

  onTimeoutError(monitorsTag, monitorName, event, action) {
    const { monitor } = this.findMonitor(monitorsTag, monitorName) || {};
    if (monitor) {
      monitor.on(event, (err, { httpResponse, ...res }) => {
        return action(res, err);
      });
    }
    return null;
  }

  async pauseResume(monitorsTag, monitorName, action, isResume) {
    const { monitor } = this.findMonitor(monitorsTag, monitorName) || {};

    if (monitor) {
      if ((!isResume && monitor.paused) || (isResume && !monitor.paused)) {
        throw LocaleKeys.ALREADY_PAUSED_RESUMED;
      }

      if (isResume) await monitor.resume();
      else await monitor.pause();

      if (action) {
        const Temp = action(monitorName);
        return Temp;
      }

      return { monitorsTag, monitorName };
    }
    return null;
  }

  async stop(monitorsTag, monitorName, action) {
    const { monitor, index } = this.findMonitor(monitorsTag, monitorName) || {};

    if (monitor) {
      await monitor.stop();

      this.monitors[monitorsTag].splice(index, 1);
      if (this.monitors[monitorsTag].length === 0) {
        delete this.monitors[monitorsTag];
      }

      if (action) {
        const Temp = action(monitorName);
        return Temp;
      }

      return { monitorsTag, monitorName };
    }
    return null;
  }

  async getMonitorsByTag(monitorTag) {
    if (!this.monitors[monitorTag]) return null;
    const output = [];

    await Promise.all(
      this.monitors[monitorTag].map(({ title }) => {
        output.push(title);
      })
    );

    return output;
  }
}

export default new _PingMonitors();
