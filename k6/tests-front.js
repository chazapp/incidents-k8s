// This k6 test will loadtest the Incidents Front End. 
// It will download the front end client;
import http from 'k6/http';
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';


export default function() {
    const res = http.get(`${__ENV.FRONT_URL}/`);
    if (res.status != 200) {
        throw new Error(`Front page failed with status ${res.status}`);
    }
    sleep(1);
}