const { createLogger, format, transports } = require("winston");
const { combine, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(label({ label: "thegoodmorningproject" }), prettyPrint()),
  transports: [new transports.Console()],
});

module.exports = logger;
