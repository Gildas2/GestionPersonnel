const si = require("systeminformation");
const os = require("os");

async function getDevices(userid, Globals) {
  let brand = '';
  let model = '';
  let macAdress = os.networkInterfaces();
  let i = 0;
  let mac = null;

  for (const key in macAdress) {
    if (i == 0) {
      mac = macAdress[key][0].mac;
    }
    i++;
  }

  // get osName and osVersion
  let version = os.version();
  let osInfo = version.split(' ');
  let osName = osInfo[0];
  let osVersion = osInfo[1];

  // get brand and model
  await si.system().then((data) => {
    brand = data.manufacturer;
    model = data.model;
    console.log(data.manufacturer);
    console.log(data.model);
  }).catch(error => console.error(error));

  // get ram
  let ram = '';
  await si.mem().then(data => {
    ram = (data.total / 1073741824).toFixed(2) + 'GB';
    console.log((data.total / 1073741824).toFixed(2) + 'GB');
  });

  // get cpu
  let cpu = '';
  await si.cpu().then(data => {
    cpu = `${data.manufacturer} ${data.brand}`;
    console.log(cpu);
    console.log(`cores: ${data.cores}`);
    console.log(`Speed: ${data.speed}GHz`);
  }).catch(error => console.error(error));

  // make uid
  console.log('infos dont j\'ai besoin');
  let uid = osName + osVersion + brand + model + ram + cpu;

  let data = new FormData();
  data.append("uid", uid);
  data.append("mac_address", mac);
  data.append("os", osName);
  data.append("os_version", osVersion);
  data.append("brand", brand);
  data.append("model", model);
  data.append("ram", ram);
  data.append("cpu", cpu);
  
  try {
    let response = await axios.post("index.php", data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDevices };
