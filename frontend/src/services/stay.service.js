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
        _id: utilService.makeId(),
        name: '', 
        price: 0, 
        createdAt: null, 
        summary: '',
        capacity: 4,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "A/C"
        ],
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
                "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-47156138/original/e522b3e5-0ece-4f0e-8023-5443831f3e0b.png?im_w=1200", "https://a0.muscache.com/im/pictures/0301689a-ddd3-4cb1-82cb-86c9e35c845d.jpg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-47156138/original/908f77ba-3d40-4957-bc58-13aefb4017a7.png?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-47156138/original/84218d4a-cfd0-4eb6-80b9-8356ce71abce.png?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-47156138/original/a8442fac-869b-4884-99dd-d1a2898d90cb.jpeg?im_w=720"],
                "price": 99.00,
                "summary": "Charming spacious Villa, located in the historic area of Toronto...",
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
                "address": "Toronto, Canada",
                "lat": 43.651070,
                "lng": -79.347015
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
              },
              {
                "_id": "10006549",
                "name": "Super 60m2 in trendy neighborhood!",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
                "price": 85.00,
                "summary": "Super 60m2 in trendy neighborhood of London",
                "capacity": 3,
                "amenities": [
                  "TV",
                  "Wifi",
                  "Kitchen",
                  "Washer and dryer",
                  "Pets allowed",
                  "Pool and Spa"
                ],
                "host": {
                  "_id": "21312321",
                  "fullname": "Sophie Moritz",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
                },
                "loc": {
                  "country": "United Kingdom",
                "countryCode": "UK",
                "address": "London, UK",
                "lat": 51.509865,
                "lng": -0.118092
                },
                "reviews": []   
                
              },
              {
                "_id": "10006569",
                "name": "Charm at the Steps of the Big Ben",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
                "price": 125.00,
                "summary": "Charm at the Steps of the Big Ben - very central",
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
                  "_id": "21312321",
                  "fullname": "Sophie Moritz",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
                },
                "loc": {
                  "country": "United Kingdom",
                "countryCode": "UK",
                "address": "London, UK",
                "lat": 51.509865,
                "lng": -0.118092
                },
                "reviews": []   
                
              },
              {
                "_id": "10006563",
                "name": "Bohemian and Chic in LA",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
                "price": 135.00,
                "summary": "Bohemian and Chic apartment in Central Los Angeles",
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
                  "_id": "21312321",
                  "fullname": "Sophie Moritz",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
                },
                "loc": {
                  "country": "United States",
                "countryCode": "USA",
                "address": "Los Angeles, USA",
                "lat": 34.052235,
                "lng": -118.243683
                },
                "reviews": []   
                
              },{
                "_id": "10006566",
                "name": "Trendy Apt in Hollywood",
                "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "@/assets/img/stay1.jpg"],
                "price": 128.00,
                "summary": "Trendy Apt in Hollywood - close to everything",
                "capacity": 3,
                "amenities": [
                  "TV",
                  "Wifi",
                  "Kitchen",
                  "Washer and dryer",
                  "Pets allowed",
                  "Pool and Spa"
                ],
                "host": {
                  "_id": "21312321",
                  "fullname": "Sophie Moritz",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
                },
                "loc": {
                  "country": "United States",
                "countryCode": "USA",
                "address": "Los Angeles, USA",
                "lat": 34.052235,
                "lng": -118.243683
                },
                "reviews": []   
                
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
