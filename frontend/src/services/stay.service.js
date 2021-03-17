// import axios from 'axios'
import { utilService } from '../services/util.service.js';
// import { storageService } from './storage.service.js';
import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';
const KEY = 'stays';
const TOY_URL = (process.env.NODE_ENV !== 'development') ? '/api/stay/'
: '//localhost:3030/api/stay/';
// 'http://localhost:3030/api/stay/'

var gFilterBy = {txt: '', pageIdx: 0}
var gStays = _createStays();

export const stayService = {
    query,
    // toggleCompleted,
    remove,
    getEmptyStay,
    save,
    getStayById,
    setFilter,
    nextPage
};

function setFilter(filterBy) {
    gFilterBy.txt = filterBy.txt
    gFilterBy.pageIdx = 0;
}
function nextPage() {
    gFilterBy.pageIdx++
}

function query(filterBy) {
    // return httpService.get('stay', { params: filterBy})
    // return axios.get(TOY_URL, { params: filterBy})
    //     .then(res => res.data)
        //  { params: gFilterBy }
    return storageService.query(KEY)
    // return JSON.parse(JSON.stringify(gStays));
}

// function toggleCompleted(id, currTime) {
//     const stay = gStays.find((stay) => stay._id === id);
//     stay.completedAt = currTime;
//     _saveStaysToStorage(gStays);
// }

function remove(id){
    // return httpService.delete('stay/' + id)
    // return axios.delete(TOY_URL + id).then(res => res.data)
    return storageService.remove(KEY, id)
    // const idx = gStays.find(stay => stay._id === id);
    // gStays.splice(idx,1);
    // _saveStaysToStorage(gStays);
}

function save(stay){
    // if (stay._id) {
        // return httpService.put('stay/' + stay._id, stay)
        // return axios.put(TOY_URL + stay._id, stay).then(res => res.data)
    // } else {
        // return httpService.post('stay', stay)
        // return axios.post(TOY_URL, stay).then(res => res.data)
    // }

    const savedStay = (stay._id) ? storageService.put(KEY, stay) : storageService.post(KEY, stay)
    return savedStay;
    // if(newStay._id){
    //     const idx = gStays.find(stay => stay._id === newStay._id);
    //     if(idx<0) return;
    //     gStays.splice(idx,1,newStay);
    // }else{ 
    //     newStay._id = utilService.makeId();
    //     gStays.unshift(newStay);}
    // _saveStaysToStorage(gStays);
}

function getEmptyStay(){
    return { 
        name: '', 
        price: 0,
        type: null, 
        createdAt: null, 
        inStock: true
    }
}

function getStayById(id){
    // return httpService.get('stay/' + id)
    // return axios.get(TOY_URL + id).then(res => res.data)
    return storageService.get(KEY, id)
    // return gStays.find(stay => stay._id === stayId)
}

function _createStays() {
    var stays = JSON.parse(localStorage.getItem(KEY))
    // let stays = storageService.load(TODO_KEY);
    if (!stays || !stays.length) {
        stays = [
            {
                "_id": "10006546",
                "name": "Charming Villa near the lake",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
                "price": 99.00,
                "summary": "Charming spacious Villa, located in the historic area of Montreal...",
                "capacity": 4,
                "amenities": [
                  "TV",
                  "Wifi",
                  "Kitchen",
                  "Washer and dryer",
                  "Pets allowed",
                  "Pool and Spa"
                ],
                "host": {
                  "_id": "51399391",
                  "fullname": "David Smith",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
                },
                "loc": {
                  "country": "Canada",
                "countryCode": "CA",
                "address": "Montreal, Canada",
                "lat": 45.508888,
                "lng": -73.561668
                },
                "reviews": [
                  {
                    "id": "434312",
                    "txt": "Amazing place, nice hosts...",
                    "rate": 5,
                    "by": {
                      "_id": "u104",
                      "fullname": "Dan Gat",
                      "imgUrl": "/img/img4.jpg"
                    }
                  }
                ]
              },
              {
                "_id": "10006550",
                "name": "Two bedroom apartment on the hill",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
                "price": 70.00,
                "summary": "fully equipped apartment next to the national park...",
                "capacity": 3,
                "amenities": [
                  "TV",
                  "Wifi",
                  "Kitchen",
                  "Washer and dryer",
                  "A/C"
            
                ],
                "host": {
                  "_id": "u106",
                  "fullname": "Jeff Gold",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
                },
                "loc": {
                  "country": "Canada",
                "countryCode": "CA",
                "address": "Toronto, Canada",
                "lat": 43.651070,
                "lng": -79.347015
                },
                "reviews": [
                  {
                    "id": "434354",
                    "txt": "very lovely place, charming people...",
                    "rate": 5,
                    "by": {
                      "_id": "u103",
                      "fullname": "Ori Rose",
                      "imgUrl": "/img/img3.jpg"
                    }
                  }
                ]
              }
        ];
        localStorage.setItem(KEY, JSON.stringify(stays))

    }
    // _saveStaysToStorage(stays)
    return stays;
}


// function _saveStaysToStorage(value){
//     storageService.store(KEY, value);
// }
