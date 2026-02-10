
const filterDevices = (devices: any[], filter: string) => {
  if (filter === 'all') return devices;
  if (filter === 'sensors') return devices.filter(d => d.type === 'Датчик');
  return devices.filter(d => d.type !== 'Датчик');
}

export default filterDevices;