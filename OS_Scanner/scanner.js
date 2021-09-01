const disk = [98, 183, 37, 122, 14, 124, 65, 67];
const root = 53;

console.log("Initial head position:", root);
console.log("Request sequence:", disk + []);
console.log("");

function FCFS(disk, root) {
  let totalSeek = 0;
  let tempDisk = disk.slice();
  tempDisk.unshift(root);
  for (let i = 0; i < tempDisk.length; i++) {
    if (tempDisk[i + 1] == undefined) break;
    else totalSeek += Math.abs(tempDisk[i + 1] - tempDisk[i]);
  }
  console.log("FCFS:", tempDisk + []);
  console.log("Total number of seek operations by FCFS:", totalSeek);
//   console.log("");
}

function SSTF(disk, root) {
  let tempDisk = disk.slice();
  let totalSeek = 0;
  tempDisk.unshift(root);
  for (let i = 0; i < tempDisk.length; i++) {
    for (let j = i; j < tempDisk.length; j++) {
      for (let k = j + 1; k < tempDisk.length; k++) {
        if (Math.abs(tempDisk[j] - root) < Math.abs(tempDisk[k] - root)) {
          [tempDisk[j], tempDisk[k]] = [tempDisk[k], tempDisk[j]];
        }
      }
    }
    [tempDisk[i], tempDisk[tempDisk.length - 1]] = [
      tempDisk[tempDisk.length - 1],
      tempDisk[i],
    ];
    root = tempDisk[i];
  }
  for (let i = 0; i < tempDisk.length; i++) {
    if (tempDisk[i + 1] == undefined) break;
    else totalSeek += Math.abs(tempDisk[i + 1] - tempDisk[i]);
  }
  console.log("SSTF:", tempDisk + []);
  console.log("Total number of seek operations by SSTF:", totalSeek);
//   console.log("");
}

function SCAN(disk, root) {
  let totalSeek = 0;
  let tempDisk = disk.slice();
  tempDisk.unshift(root);
  if (tempDisk.indexOf(0) == -1) tempDisk.splice(0, 0, 0);
  tempDisk.sort(function (a, b) {
    return a - b;
  });
  let head = [];
  let tail = [];
  for (let i = tempDisk.indexOf(root); i >= 0; i--) {
    head.push(tempDisk[i]);
    if (tempDisk[i - 1] == undefined) {
      totalSeek += tempDisk[tempDisk.indexOf(root) + 1];
      continue;
    } else totalSeek += tempDisk[i] - tempDisk[i - 1];
  }
  for (let i = tempDisk.indexOf(root) + 1; i < tempDisk.length; i++) {
    tail.push(tempDisk[i]);
    if (tempDisk[i + 1] == undefined) continue;
    else totalSeek += tempDisk[i + 1] - tempDisk[i];
  }
  head.splice(head.indexOf(0), 1);
  console.log("SCAN:", head + "," + tail);
  console.log("Total number of seek operations by SCAN:", totalSeek);
  console.log("");/
}

function C_SCAN(disk, root) {
  let totalSeek = 0;
  let tempDisk = disk.slice();
  tempDisk.unshift(root);
  if (tempDisk.indexOf(0) == -1) tempDisk.splice(0, 0, 0);
  tempDisk.sort(function (a, b) {
    return a - b;
  });
  let head = [];
  let tail = [];
  for (let i = tempDisk.indexOf(root); i < tempDisk.length; i++) {
    head.push(tempDisk[i]);
    if (tempDisk[i + 1] == undefined) {
      totalSeek += tempDisk[i] - tempDisk[tempDisk.indexOf(root) - 1];
      continue;
    } else totalSeek += tempDisk[i + 1] - tempDisk[i];
  }
  for (let i = 0; i <= tempDisk.indexOf(root) - 1; i++) {
    tail.push(tempDisk[i]);
    if (tempDisk[i - 1] == undefined) continue;
    else totalSeek += tempDisk[i] - tempDisk[i - 1];
  }
  tail.splice(tail.indexOf(0), 1);
  console.log("C-SCAN:", head + "," + tail);
  console.log("Total number of seek operations by C-SCAN:", totalSeek);
//   console.log("");
}

FCFS(disk, root);
SSTF(disk, root);
SCAN(disk, root);
C_SCAN(disk, root);
