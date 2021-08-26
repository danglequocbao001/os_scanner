const disk = [176, 79, 34, 60, 92, 11, 41, 114];
const root = 50;

console.log("Initial head position:", root);
console.log("Request sequence:", disk + []);
console.log("");

function FCFS(disk, root) {
  let totalSeek = 0;
  let tempDisk = disk;
  let tempRoot = root;
  tempDisk.unshift(tempRoot);
  for (let i = 0; i < tempDisk.length; i++) {
    if (tempDisk[i + 1] == undefined) break;
    else totalSeek += Math.abs(tempDisk[i + 1] - tempDisk[i]);
  }

  console.log("FCFS:", tempDisk + []);
  console.log("Total number of seek operations by FCFS:", totalSeek);
  console.log("");
  tempDisk.splice(tempDisk.indexOf(tempRoot), 1);
}
function SCAN(disk, root) {
  let totalSeek = 0;
  let tempDisk = disk;
  let tempRoot = root;
  tempDisk.unshift(tempRoot);

  if (tempDisk.indexOf(0) == -1) tempDisk.splice(0, 0, 0);

  tempDisk.sort(function (a, b) {
    return a - b;
  });

  let head = [];
  let tail = [];

  for (let i = tempDisk.indexOf(tempRoot); i >= 0; i--) {
    head.push(tempDisk[i]);
    if (tempDisk[i - 1] == undefined) {
      totalSeek += tempDisk[tempDisk.indexOf(tempRoot) + 1];
      continue;
    } else totalSeek += tempDisk[i] - tempDisk[i - 1];
  }
  for (let i = tempDisk.indexOf(tempRoot) + 1; i < tempDisk.length; i++) {
    tail.push(tempDisk[i]);
    if (tempDisk[i + 1] == undefined) continue;
    else totalSeek += tempDisk[i + 1] - tempDisk[i];
  }
  head.splice(head.indexOf(0), 1);
  console.log("SCAN:", head + "," + tail);
  console.log("Total number of seek operations by SCAN:", totalSeek);
  console.log("");
  tempDisk.splice(tempDisk.indexOf(tempRoot), 1);
}
function C_SCAN(disk, root) {
  let totalSeek = 0;
  let tempDisk = disk;
  let tempRoot = root;
  tempDisk.unshift(tempRoot);

  if (tempDisk.indexOf(0) == -1) tempDisk.splice(0, 0, 0);

  tempDisk.sort(function (a, b) {
    return a - b;
  });

  let head = [];
  let tail = [];
  for (let i = tempDisk.indexOf(tempRoot); i < tempDisk.length; i++) {
    head.push(tempDisk[i]);
    if (tempDisk[i + 1] == undefined) {
      totalSeek += tempDisk[i] - tempDisk[tempDisk.indexOf(tempRoot) - 1];
      continue;
    } else totalSeek += tempDisk[i + 1] - tempDisk[i];
  }
  for (let i = tempDisk.indexOf(tempRoot) - 1; i >= 0; i--) {
    tail.push(tempDisk[i]);
    if (tempDisk[i - 1] == undefined) continue;
    else totalSeek += tempDisk[i] - tempDisk[i - 1];
  }
  tail.splice(tail.indexOf(0), 1);
  console.log("C-SCAN:", head + "," + tail);
  console.log("Total number of seek operations by C-SCAN:", totalSeek);
  console.log("");
  tempDisk.splice(tempDisk.indexOf(tempRoot), 1);
}

FCFS(disk, root);
SCAN(disk, root);
C_SCAN(disk, root);