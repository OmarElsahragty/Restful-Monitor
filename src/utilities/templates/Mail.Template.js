import Config from "../../../config";

export const passCodeMailTemplate = (
  subject,
  message,
  passCode
) => `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>${Config.App.Name} - ${subject}</title>
    <meta name="description" content="${Config.App.Name} ${subject}">

    <style type="text/css">
      body #x_outlook a {
        padding: 0;
      }

      body .x_ReadMsgBody {
        width: 100%;
      }

      body .x_ExternalClass {
        width: 100%;
      }

      body .x_ExternalClass * {
        line-height: 100%;
      }

      body > div {
        margin: 0;
        padding: 0;
      }

      body table,
      body td {
        border-collapse: collapse;
      }

      body img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }

      body p {
        display: block;
        margin: 13px 0;
      }
    </style>

    <style type="text/css">
      @media only screen and (min-width: 480px) {
        body .x_mj-column-per-100,
        body * [aria-labelledby="mj-column-per-100"] {
          width: 100% !important;
        }
      }
    </style>
  </head>

  <body style="background: #f9f9f9; background-color: #f9f9f9; height: 100%">
    <div style="margin: 0px auto; max-width: 640px; background: transparent">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        align="center"
        border="0"
        style="font-size: 0px; width: 100%; background: transparent"
      >
        <tbody>
          <tr>
            <td
              style="
                text-align: center;
                vertical-align: top;
                direction: ltr;
                font-size: 0px;
                padding: 40px 0px;
              "
            >
              <div
                aria-labelledby="mj-column-per-100"
                class="x_mj-column-per-100 x_outlook-group-fix"
                style="
                  vertical-align: top;
                  display: inline-block;
                  direction: ltr;
                  font-size: 13px;
                  text-align: left;
                  width: 100%;
                "
              >
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style="
                          word-break: break-word;
                          font-size: 0px;
                          padding: 0px;
                        "
                      >
                        <table
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          border="0"
                          style="border-collapse: collapse; border-spacing: 0px"
                        >
                          <tbody>
                            <tr>
                              <td style="width: 138px">
                                <img
                                  data-imagetype="External"
                                  src="${Config.App.Logo}"
                                  alt="${Config.App.Name}"
                                  title="${Config.App.Name}"
                                  height="38px"
                                  width="138"
                                  style="
                                    border: none;
                                    border-radius: 2;
                                    display: block;
                                    outline: none;
                                    text-decoration: none;
                                    width: 100%;
                                    height: 38px;
                                  "
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      style="
        max-width: 640px;
        margin: 0 auto;
        border-radius: 4px;
        overflow: hidden;
      "
    >
      <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          align="center"
          border="0"
          style="font-size: 0px; width: 100%; background: #ffffff"
        >
          <tbody>
            <tr>
              <td
                style="
                  text-align: center;
                  vertical-align: top;
                  direction: ltr;
                  font-size: 0px;
                  padding: 40px 50px;
                "
              >
                <div
                  aria-labelledby="mj-column-per-100"
                  class="x_mj-column-per-100 x_outlook-group-fix"
                  style="
                    vertical-align: top;
                    display: inline-block;
                    direction: ltr;
                    font-size: 13px;
                    text-align: left;
                    width: 100%;
                  "
                >
                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    border="0"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 0px;
                          "
                        >
                          <div
                            style="
                              color: #737f8d;
                              font-family: Whitney, Helvetica Neue, Helvetica,
                                Arial, Lucida Grande, sans-serif;
                              font-size: 16px;
                              line-height: 24px;
                              text-align: center;
                            "
                          >
                            <h2
                              style="
                                font-family: Whitney, Helvetica Neue, Helvetica,
                                  Arial, Lucida Grande, sans-serif;
                                font-weight: 500;
                                font-size: 20px;
                                color: #4f545c;
                                letter-spacing: 0.27px;
                              "
                            >
                              Hey
                            </h2>
                            <p>${message}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20px;
                          "
                        >
                          <table
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            border="0"
                            style="border-collapse: separate"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  valign="middle"
                                  bgcolor="#e20707"
                                  style="
                                    border: none;
                                    border-radius: 3px;
                                    color: white;
                                    padding: 15px 19px;
                                  "
                                >
                                  <p
                                    style="
                                      text-decoration: none;
                                      line-height: 100%;
                                      background: #e20707;
                                      color: white;
                                      font-family: Ubuntu, Helvetica, Arial,
                                        sans-serif;
                                      font-size: 15px;
                                      font-weight: normal;
                                      text-transform: none;
                                      margin: 0px;
                                    "
                                  >
                                    <p>${passCode}</p>
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>
`;

export const upDownMailTemplate = (
  subject,
  website,
  message
) => `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>${Config.App.Name} - ${subject}</title>
    <meta name="description" content="${Config.App.Name} ${subject}">

    <style type="text/css">
      body #x_outlook a {
        padding: 0;
      }

      body .x_ReadMsgBody {
        width: 100%;
      }

      body .x_ExternalClass {
        width: 100%;
      }

      body .x_ExternalClass * {
        line-height: 100%;
      }

      body > div {
        margin: 0;
        padding: 0;
      }

      body table,
      body td {
        border-collapse: collapse;
      }

      body img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }

      body p {
        display: block;
        margin: 13px 0;
      }
    </style>

    <style type="text/css">
      @media only screen and (min-width: 480px) {
        body .x_mj-column-per-100,
        body * [aria-labelledby="mj-column-per-100"] {
          width: 100% !important;
        }
      }
    </style>
  </head>

  <body style="background: #f9f9f9; background-color: #f9f9f9; height: 100%">
    <div style="margin: 0px auto; max-width: 640px; background: transparent">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        align="center"
        border="0"
        style="font-size: 0px; width: 100%; background: transparent"
      >
        <tbody>
          <tr>
            <td
              style="
                text-align: center;
                vertical-align: top;
                direction: ltr;
                font-size: 0px;
                padding: 40px 0px;
              "
            >
              <div
                aria-labelledby="mj-column-per-100"
                class="x_mj-column-per-100 x_outlook-group-fix"
                style="
                  vertical-align: top;
                  display: inline-block;
                  direction: ltr;
                  font-size: 13px;
                  text-align: left;
                  width: 100%;
                "
              >
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style="
                          word-break: break-word;
                          font-size: 0px;
                          padding: 0px;
                        "
                      >
                        <table
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          border="0"
                          style="border-collapse: collapse; border-spacing: 0px"
                        >
                          <tbody>
                            <tr>
                              <td style="width: 138px">
                                <img
                                  data-imagetype="External"
                                  src="${Config.App.Logo}"
                                  alt="${Config.App.Name}"
                                  title="${Config.App.Name}"
                                  height="38px"
                                  width="138"
                                  style="
                                    border: none;
                                    border-radius: 2;
                                    display: block;
                                    outline: none;
                                    text-decoration: none;
                                    width: 100%;
                                    height: 38px;
                                  "
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      style="
        max-width: 640px;
        margin: 0 auto;
        border-radius: 4px;
        overflow: hidden;
      "
    >
      <div style="margin: 0px auto; max-width: 640px; background: #ffffff">
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          align="center"
          border="0"
          style="font-size: 0px; width: 100%; background: #ffffff"
        >
          <tbody>
            <tr>
              <td
                style="
                  text-align: center;
                  vertical-align: top;
                  direction: ltr;
                  font-size: 0px;
                  padding: 40px 50px;
                "
              >
                <div
                  aria-labelledby="mj-column-per-100"
                  class="x_mj-column-per-100 x_outlook-group-fix"
                  style="
                    vertical-align: top;
                    display: inline-block;
                    direction: ltr;
                    font-size: 13px;
                    text-align: left;
                    width: 100%;
                  "
                >
                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    border="0"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 0px;
                          "
                        >
                          <div
                            style="
                              color: #737f8d;
                              font-family: Whitney, Helvetica Neue, Helvetica,
                                Arial, Lucida Grande, sans-serif;
                              font-size: 16px;
                              line-height: 24px;
                              text-align: center;
                            "
                          >
                            <h2
                              style="
                                font-family: Whitney, Helvetica Neue, Helvetica,
                                  Arial, Lucida Grande, sans-serif;
                                font-weight: 500;
                                font-size: 20px;
                                color: #4f545c;
                                letter-spacing: 0.27px;
                              "
                            >
                              ${website}
                            </h2>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            word-break: break-word;
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20px;
                          "
                        >
                          <table
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            border="0"
                            style="border-collapse: separate"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  valign="middle"
                                  bgcolor="#e20707"
                                  style="
                                    border: none;
                                    border-radius: 3px;
                                    color: white;
                                    padding: 15px 19px;
                                  "
                                >
                                  <p
                                    style="
                                      text-decoration: none;
                                      line-height: 100%;
                                      background: #e20707;
                                      color: white;
                                      font-family: Ubuntu, Helvetica, Arial,
                                        sans-serif;
                                      font-size: 15px;
                                      font-weight: normal;
                                      text-transform: none;
                                      margin: 0px;
                                    "
                                  >
                                    <p>${message}</p>
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>`;
