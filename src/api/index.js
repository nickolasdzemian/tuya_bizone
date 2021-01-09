import { TYSdk } from 'tuya-panel-kit';
/*
const TYNative = TYSdk.native;
const sucStyle = 'background: green; color: #fff;';
const errStyle = 'background: red; color: #fff;';

const api = function(a, postData, v = '1.0') {
  return new Promise((resolve, reject) => {
    TYNative.apiRNRequest(
      {
        a,
        postData,
        v,
      },
      d => {
        const data = typeof d === 'string' ? JSON.parse(d) : d;
        console.log(`API Success: %c${a}%o`, sucStyle, data);
        resolve(data);
      },
      err => {
        const e = typeof err === 'string' ? JSON.parse(err) : err;
        console.log(`API Failed: %c${a}%o`, errStyle, e.message || e.errorMsg || e);
        reject(err);
      }
    );
  });
};

TYNative.getSaveDay = () => {
  return api('tuya.m.device.neptun.active.period', {}, '1.0');
};

TYNative.getAlarmCount = () => {
  return api('tuya.m.device.neptun.alarm.unread', {}, '1.0');
};

TYNative.getRecordLits = params => {
  return api('tuya.m.scale.history.list', params, '2.0');
};

//  报警记录合并
TYNative.getDpHistory = (dpIds, limit = 50, offset = 0) => {
  return api('tuya.m.device.neptun.alarm.list', {
    limit,
    offset,
    dpIds,
  });
};

export default TYNative;
*/

TYSdk.getWeatherQuality = () => {
  return new Promise((resolve, reject) => {
    TYSdk.device.getDeviceInfo().then(res => {
      const { devId } = res;
      TYSdk.apiRequest({
        a: 'tuya.m.public.weather.get',
        postData: {
          devId,
          codes: [
            'city.id',
            'city.name',
            'weather.air.qualityLevel',
            'weather.air.pm25',
            'weather.air.quality',
            'weather.now.temperature',
            'weather.now.hum',
            'weather.now.condIconUrl',
            'weather.now.condTxt',
          ],
        },
        v: '1.0',
      })
        .then(d => {
          const data = Utils.JsonUtils.parseJSON(d);
          console.log('data', data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};
