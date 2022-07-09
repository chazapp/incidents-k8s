import http from 'k6/http';
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';


// export const options = {
//     vus: 10,
//     duration: '30s',
// }

const getCsrfToken = () => {
    const authPage = http.get(`${__ENV.API_URL}/auth/`);
    // Get CSRF token
    const doc = parseHTML(authPage.body);
    const csrfToken = doc.find('input[name="csrfmiddlewaretoken"]').attr('value');
    return csrfToken;
}

export default function() {
    let csrfToken = getCsrfToken();
    // authenticate to API
    let res = http.post(`${__ENV.API_URL}/auth/`, JSON.stringify({
        "username": __ENV.API_USER,
        "password": __ENV.API_PASSWORD,
    }), {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        }
    });
    if (res.status != 200) {
        throw new Error(`Authentication failed with status ${res.status}`);
    }
    // Get incidents first page
    res = http.get(`${__ENV.API_URL}/incidents/`);
    if (res.status != 200) {
        throw new Error(`Incidents page failed with status ${res.status}`);
    }
    // Create an incident
    csrfToken = getCsrfToken();
    res = http.post(`${__ENV.API_URL}/incidents/`, JSON.stringify({
        "title": "Test incident",
        "description": "Test incident description",
        "severity": "High",
        "status": "Closed",
    }), {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        }
    });
    if (res.status != 201) {
        console.log(res.body);
        throw new Error(`Incident creation failed with status ${res.status}`);
    }
    const incidentID = JSON.parse(res.body).id;
    // Delete the incident
    csrfToken = getCsrfToken();
    res = http.del(`${__ENV.API_URL}/incidents/${incidentID}/`, null, {
        headers: {
            "X-CSRFToken": csrfToken,
        }
    });
    if (res.status != 204) {
        throw new Error(`Incident deletion failed with status ${res.status}`);
    }
    sleep(1);
}