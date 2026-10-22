// Build switches read from the environment. NOINDEX=1 asks search engines not to list the site (for test builds).
module.exports = { noindex: Boolean(process.env.NOINDEX) };
