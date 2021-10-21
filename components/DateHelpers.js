/**
 * @return timestamp as string in format "15-10-2019T08:32"
 */
function getTimeStamp() {
  var d = new Date();
  var timestamp =
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    d.getFullYear() +
    "T" +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2);
  return timestamp;
}

export { getTimeStamp };
