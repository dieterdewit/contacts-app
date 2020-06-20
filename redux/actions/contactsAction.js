export const CONTACTS = 'CONTACTS';
import axios from 'axios';

export const getContacts = () => dispatch =>
    axios({
        method: 'GET',
        url: `http://localhost:3100/api/contacts/2`,
        headers: {
            'Content-Type': 'application/json', 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOltbeyJ1c2VyX2lkIjoyfV0sW3siX2J1ZiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEsMCwwLDEsMSw2NSwwLDAsMiwzLDEwMCwxMDEsMTAyLDE5LDk5LDExMSwxMTAsMTE2LDk3LDk5LDExNiwxMTUsOTUsMTA5LDk3LDExMCw5NywxMDMsMTAxLDEwOSwxMDEsMTEwLDExNiw1LDExNywxMTUsMTAxLDExNCwxMTUsNSwxMTcsMTE1LDEwMSwxMTQsMTE1LDcsMTE3LDExNSwxMDEsMTE0LDk1LDEwNSwxMDAsNywxMTcsMTE1LDEwMSwxMTQsOTUsMTA1LDEwMCwxMiw2MywwLDYsMCwwLDAsMywzLDY2LDAsMCwwLDUsMCwwLDMsMjU0LDAsMCwyLDAsMiwwLDAsNCwxLDUwLDUsMCwwLDUsMjU0LDAsMCwyLDBdfSwiX2NsaWVudEVuY29kaW5nIjoidXRmOCIsIl9jYXRhbG9nTGVuZ3RoIjozLCJfY2F0YWxvZ1N0YXJ0IjoxMCwiX3NjaGVtYUxlbmd0aCI6MTksIl9zY2hlbWFTdGFydCI6MTQsIl90YWJsZUxlbmd0aCI6NSwiX3RhYmxlU3RhcnQiOjM0LCJfb3JnVGFibGVMZW5ndGgiOjUsIl9vcmdUYWJsZVN0YXJ0Ijo0MCwiX29yZ05hbWVMZW5ndGgiOjcsIl9vcmdOYW1lU3RhcnQiOjU0LCJjaGFyYWN0ZXJTZXQiOjYzLCJlbmNvZGluZyI6ImJpbmFyeSIsIm5hbWUiOiJ1c2VyX2lkIiwiY29sdW1uTGVuZ3RoIjo2LCJjb2x1bW5UeXBlIjozLCJmbGFncyI6MTY4OTksImRlY2ltYWxzIjowfV1dLCJpYXQiOjE1OTI2ODQ0NjAsImV4cCI6MTU5MjY4ODA2MH0.BWhjNXm_ZBoMRXg8UpCPlCgTVp-Nr6WCuHw5rq9hERo'
        }
    }).then(response => dispatch({ type: 'CONTACTS', payload: response.data }));