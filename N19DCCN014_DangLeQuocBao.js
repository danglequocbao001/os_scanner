// let disk = [176, 79, 34, 60, 92, 11, 41, 114];
// let root = 50;

let disk = [98, 183, 37, 122, 14, 124, 65, 67];
let root = 53;

console.log("Initial head position:", root);
console.log("Request sequence:", disk + []);
console.log("");

function FCFS(disk, root) {
  let totalSeek = 0;
  disk.splice(0, 0, root);

  for (let i = 0; i < disk.length; i++) {
    if (disk[i + 1] == undefined) break;
    else totalSeek += Math.abs(disk[i + 1] - disk[i]);
  }

  console.log("FCFS:", disk + []);
  console.log("Total number of seek operations by FCFS:", totalSeek);
  console.log("");
}

function SCAN(disk, root) {
  let totalSeek = 0;
  disk.splice(0, 0, root);

  if (disk.indexOf(0) == -1) disk.splice(0, 0, 0);

  disk.sort(function (a, b) {
    return a - b;
  });

  let head = [];
  let tail = [];

  //scan the left part first if index of root <= mid number of disk array
  for (let i = disk.indexOf(root); i >= 0; i--) {
    head.push(disk[i]);
    if (disk[i - 1] == undefined) {
      totalSeek += disk[disk.indexOf(root) + 1];
      continue;
    } else totalSeek += disk[i] - disk[i - 1];
  }
  for (let i = disk.indexOf(root) + 1; i < disk.length; i++) {
    tail.push(disk[i]);
    if (disk[i + 1] == undefined) continue;
    else totalSeek += disk[i + 1] - disk[i];
  }

  console.log("SCAN:", head + "," + tail);
  console.log("Total number of seek operations by SCAN:", totalSeek);
  console.log("");
}
function C_SCAN(disk, root) {
  let totalSeek = 0;
  disk.splice(0, 0, root);

  if (disk.indexOf(0) == -1) disk.splice(0, 0, 0);

  disk.sort(function (a, b) {
    return a - b;
  });

  let head = [];
  let tail = [];

  //scan the right part first if index of root > mid number of disk array
  for (let i = disk.indexOf(root); i < disk.length; i++) {
    head.push(disk[i]);
    if (disk[i + 1] == undefined) {
      totalSeek += disk[i] - disk[disk.indexOf(root) - 1];
      continue;
    } else totalSeek += disk[i + 1] - disk[i];
  }
  for (let i = disk.indexOf(root) - 1; i >= 0; i--) {
    tail.push(disk[i]);
    if (disk[i - 1] == undefined) continue;
    else totalSeek += disk[i] - disk[i - 1];
  }
  console.log("C-SCAN:", head + "," + tail);
  console.log("Total number of seek operations by C-SCAN:", totalSeek);
  console.log("");
}

FCFS(disk, root);
SCAN(disk, root);
C_SCAN(disk, root);
