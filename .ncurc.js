/**
 * npm-check-updates upgrades package.json dependencies to the latest versions, ignoring specified versions
 * @documentation https://www.npmjs.com/package/npm-check-updates#options
 **/
module.exports = {
  /** Overwrite package file with upgraded versions instead of just outputting to console */
  upgrade: true,
  /** Interactive prompts for each dependency */
  interactive: true,
  /** Groups packages by major, minor, patch, and major version zero updates */
  format: 'group',
  /** Exclude packages matching the given string, wildcard, glob, comma-or-space-delimited list, /regex/, or predicate function */
  reject: [],
};
