import StatsCalculator from "@/statsCalculator"

const testUser = {
    "_id": "6541129f4ee767e78e88bb99",
    "username": "Max",
    "email": "m.brookman.byrne@gmail.com",
    "password": "$2b$10$rp/R8mxWGbjm9fyhjMsuwujjATh6YI5wfg6X/hxDKYdA/wrUS4AzO",
    "__v": 16,
    "updatedAt": "2023-11-20T11:43:41.231Z",
    "firstName": "Max",
    "lastName": "Brookman-Byrne",
    "height": 183,
    "weight": 63,
    "dateOfBirth": "1987-03-05T00:00:00.000Z",
    "activities": [
        {
            "_id": "655b466db2d29cefd5fa7411",
            "activity": "climb",
            "duration": 120,
            "intensity": 6,
            "date": "2023-11-17T11:43:28.000Z",
            "notes": "Hard climb!",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:43:41.190Z",
            "updatedAt": "2023-11-20T11:43:41.190Z",
            "__v": 0
        },
        {
            "_id": "655b465fb2d29cefd5fa740b",
            "activity": "run",
            "duration": 45,
            "intensity": 5,
            "date": "2023-11-15T11:43:10.000Z",
            "notes": "Long run in the gym",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:43:27.102Z",
            "updatedAt": "2023-11-20T11:43:27.102Z",
            "__v": 0
        },
        {
            "_id": "655b464bb2d29cefd5fa7405",
            "activity": "run",
            "duration": 30,
            "intensity": 6,
            "date": "2023-11-14T11:42:46.000Z",
            "notes": "A quick run outside",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:43:07.753Z",
            "updatedAt": "2023-11-20T11:43:07.753Z",
            "__v": 0
        },
        {
            "_id": "655b4635b2d29cefd5fa73ff",
            "activity": "run",
            "duration": 40,
            "intensity": 6,
            "date": "2023-11-11T11:42:29.000Z",
            "notes": "Run at the gym",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:42:45.249Z",
            "updatedAt": "2023-11-20T11:42:45.249Z",
            "__v": 0
        },
        {
            "_id": "655b4624b2d29cefd5fa73f9",
            "activity": "swim",
            "duration": 40,
            "intensity": 6,
            "date": "2023-11-09T11:42:14.000Z",
            "notes": "Quick after work swim",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:42:28.360Z",
            "updatedAt": "2023-11-20T11:42:28.360Z",
            "__v": 0
        },
        {
            "_id": "655b4614b2d29cefd5fa73f3",
            "activity": "cycle",
            "duration": 120,
            "intensity": 7,
            "date": "2023-11-08T11:42:01.000Z",
            "notes": "A very long cycle",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:42:12.382Z",
            "updatedAt": "2023-11-20T11:42:12.382Z",
            "__v": 0
        },
        {
            "_id": "655b4603b2d29cefd5fa73ed",
            "activity": "run",
            "duration": 60,
            "intensity": 5,
            "date": "2023-11-05T11:00:00.000Z",
            "notes": "A nice gentle run",
            "user": "6541129f4ee767e78e88bb99",
            "createdAt": "2023-11-20T11:41:55.766Z",
            "updatedAt": "2023-11-20T11:41:55.766Z",
            "__v": 0
        }
    ],
    "goals": [
        {
            "_id": "65589e23b2d29cefd5fa7388",
            "goalType": "repetition",
            "activity": "cycle",
            "target": 3,
            "goalPeriod": 7,
            "userId": [
                "6541129f4ee767e78e88bb99"
            ],
            "createdAt": "2023-11-18T11:21:07.787Z",
            "updatedAt": "2023-11-18T11:21:07.787Z",
            "__v": 0
        },
        {
            "_id": "65589e3ab2d29cefd5fa738b",
            "goalType": "repetition",
            "activity": "climb",
            "target": 1,
            "goalPeriod": 3,
            "userId": [
                "6541129f4ee767e78e88bb99"
            ],
            "createdAt": "2023-11-18T11:21:30.744Z",
            "updatedAt": "2023-11-18T11:21:30.744Z",
            "__v": 0
        },
        {
            "_id": "65589f7cb2d29cefd5fa739a",
            "goalType": "repetition",
            "activity": "any",
            "target": 4,
            "goalPeriod": 5,
            "userId": [
                "6541129f4ee767e78e88bb99"
            ],
            "createdAt": "2023-11-18T11:26:52.657Z",
            "updatedAt": "2023-11-18T11:26:52.657Z",
            "__v": 0
        },
        {
            "_id": "65589fc3b2d29cefd5fa73ac",
            "goalType": "duration",
            "activity": "weights",
            "target": 1,
            "goalPeriod": 1,
            "userId": [
                "6541129f4ee767e78e88bb99"
            ],
            "createdAt": "2023-11-18T11:28:03.120Z",
            "updatedAt": "2023-11-18T11:28:03.120Z",
            "__v": 0
        },
        {
            "_id": "65589fccb2d29cefd5fa73b1",
            "goalType": "duration",
            "activity": "climb",
            "target": 1,
            "goalPeriod": 1,
            "userId": [
                "6541129f4ee767e78e88bb99"
            ],
            "createdAt": "2023-11-18T11:28:12.235Z",
            "updatedAt": "2023-11-18T11:28:12.235Z",
            "__v": 0
        },
        {
            "_id": "65589fe7b2d29cefd5fa73b6",
            "goalType": "repetition",
            "activity": "cycle",
            "target": 1,
            "goalPeriod": 1,
            "userId": [
                "6541129f4ee767e78e88bb99"
            ],
            "createdAt": "2023-11-18T11:28:39.179Z",
            "updatedAt": "2023-11-18T11:28:39.179Z",
            "__v": 0
        }
    ]
}

const newTestUser = new StatsCalculator(testUser)

module.exports = newTestUser