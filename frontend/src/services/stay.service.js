// import axios from 'axios'
import { utilService } from '../services/util.service.js';
// import { storageService } from './storage.service.js';
import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';
const KEY = 'stays';
const TOY_URL = (process.env.NODE_ENV !== 'development') ? '/api/stay/'
  : '//localhost:3030/api/stay/';
// 'http://localhost:3030/api/stay/'

var gFilterBy = { txt: '', pageIdx: 0 }
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

function remove(id) {
  // return httpService.delete('stay/' + id)
  // return axios.delete(TOY_URL + id).then(res => res.data)
  return storageService.remove(KEY, id)
  // const idx = gStays.find(stay => stay._id === id);
  // gStays.splice(idx,1);
  // _saveStaysToStorage(gStays);
}

function save(stay) {
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

function getEmptyStay() {
  return {
    _id: utilService.makeId(),
    name: '',
    imgUrls: [],
    price: null,
    createdAt: null,
    summary: '',
    capacity: null,
    amenities: [
      "TV",
      "Wifi",
      "Kitchen",
      "A/C"
    ],
    host: {
      _id: utilService.makeId(),
      fullname: '',
      imgUrl: null,
    },
    loc: {
      address: '',
    }
  }
}

function getStayById(id) {
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
        "imgUrls": ["https://a0.muscache.com/im/pictures/ff2c1c5a-2f80-4002-a976-f9eb89a33203.jpg?im_w=720", "https://a0.muscache.com/im/pictures/cb8527e0-ba95-431f-b5be-95b1da9fecc2.jpg?im_w=720", "https://a0.muscache.com/im/pictures/7df0697a-af3c-4b06-9ef6-73697d43981d.jpg?im_w=720", "https://a0.muscache.com/im/pictures/c8826702-5697-43c0-ae80-4e066fbe76b2.jpg?im_w=720", "https://a0.muscache.com/im/pictures/da8eb079-a05f-43fa-a537-0b01baba46fb.jpg?im_w=720"],
        "price": 99.00,
        "summary": "I hope you'll feel perfectly at home at my spacious villa located where the entertainment district, waterfront, and financial district merge. My place is just steps away from the city's most popular attractions! It features a large balcony with a city view. The kitchen is fully equipped. The queen-sized bed is comfortable and sofa beds are also available!",
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
          "imgUrl": "https://a0.muscache.com/im/pictures/user/13b7cb9a-3ca4-4cd0-bd16-c501da6a12fe.jpg?im_w=240"
        },
        "loc": {
          "country": "Canada",
          "countryCode": "CA",
          "address": "Toronto",
          "lat": 43.651070,
          "lng": -79.347015
        },
        "reviews": [
          {
            "id": "434312",
            "txt": "Nicely designed, cosy apartment for professionals and those who like downtown lifestyle. Highly recommend!",
            "rate": 4,
            "by": {
              "_id": "u104",
              "fullname": "Dan Gat",
              "imgUrl": "https://a0.muscache.com/im/pictures/user/4b4af084-02c2-4a83-b753-738b0c643ab7.jpg?aki_policy=profile_x_medium"
            }
          },
          {
            "id": "434532",
            "txt": "This place was ok and could've been a lot better. definitely not clean and smelled really bad in there.",
            "rate": 4,
            "by": {
              "_id": "u107",
              "fullname": "Bruce Brown",
              "imgUrl": "https://a0.muscache.com/im/pictures/user/a641c617-c565-42c0-a02e-e7451f6f5092.jpg?aki_policy=profile_x_medium"
            }
          }
        ]
      },
      {
        "_id": "10006550",
        "name": "Two bedroom apartment on the hill",
        "imgUrls": ["https://a0.muscache.com/im/pictures/f9fadcd7-969f-4d65-a7cc-a60613b60e30.jpg?im_w=720", "https://a0.muscache.com/im/pictures/ce7f3554-15ce-46f7-b7cc-b2ccd9155341.jpg?im_w=720", "https://a0.muscache.com/im/pictures/cbf4f19b-7c60-4e0a-bdc5-a611391ba819.jpg?im_w=720", "https://a0.muscache.com/im/pictures/bca9e0ee-4c39-47df-a04d-ad30fe780f12.jpg?im_w=720", "https://a0.muscache.com/im/pictures/5c2891b3-4713-479e-95ca-cdaf4f7b61f6.jpg?im_w=720"],
        "price": 70.00,
        "summary": "Beyond everything you can imagine when you see these photos-lays a hidden oasis, just 15 min from city center and 7 min from a perfect beach. A paradise for nature lovers who don't compromise on the highest quality materials.",
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
          "imgUrl": "https://a0.muscache.com/im/pictures/user/c3eee178-d38f-460f-b6af-2560f63d09ea.jpg?im_w=240"
        },
        "loc": {
          "country": "Canada",
          "countryCode": "CA",
          "address": "Toronto",
          "lat": 43.651070,
          "lng": -79.347015
        },
        "reviews": [
          {
            "id": "434354",
            "txt": "I could not recommend it more! We didn’t leave the house once over our entire trip, there was no need. The house, yard and pool are kept in immaculate shape and work for all ages. We were from ages 3 months to 60 years old and the house worked for every single person. We will definitely be staying here again!",
            "rate": 5,
            "by": {
              "_id": "u103",
              "fullname": "Ori Rose",
              "imgUrl": "https://a0.muscache.com/im/pictures/user/05cffe3a-3573-47b2-b7c0-0bcc7cb53c87.jpg?im_w=240"
            }
          }
        ]
      },
      {
        "_id": "10006549",
        "name": "Super 60m2 in trendy neighborhood!",
        "imgUrls": ["https://a0.muscache.com/im/pictures/6757ff00-c58e-447b-b835-fcb9c282ef6c.jpg?im_w=720", "https://a0.muscache.com/im/pictures/16c5f59c-2404-4c00-a7b6-497c234ed1e0.jpg?im_w=720", "https://a0.muscache.com/im/pictures/9fc71532-5033-49be-abb1-52bcd8d9fcaf.jpg?im_w=720", "https://a0.muscache.com/im/pictures/f2e6581c-c8f3-4c43-8b02-d095460674d5.jpg?im_w=720", "https://a0.muscache.com/im/pictures/814e51be-6dfc-4373-9cda-154e70eb912b.jpg?im_w=720"],
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
          "imgUrl": "https://a0.muscache.com/im/pictures/user/05cffe3a-3573-47b2-b7c0-0bcc7cb53c87.jpg?im_w=240"
        },
        "loc": {
          "country": "United Kingdom",
          "countryCode": "UK",
          "address": "London",
          "lat": 51.509865,
          "lng": -0.118092
        },
        "reviews": [
          {
          "id": "434998",
          "txt": "Perfect little getaway",
          "rate": 4,
          "by": {
            "_id": "u109",
            "fullname": "Dana Schultz",
            "imgUrl": "https://a0.muscache.com/im/pictures/user/1db47629-4148-4123-9da9-530481e4a8c8.jpg?im_w=240"
          }
        }
      ]

      },
      {
        "_id": "10006569",
        "name": "Charm at the Steps of the Big Ben",
        "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-47997821/original/49793977-2eff-4e82-a1ef-610832c3f526.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-47997821/original/70575592-6805-47b1-80e0-3fab545d6e23.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-47997821/original/916bf962-14c5-4690-b8c8-169c84e06aef.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/miso/Hosting-47997821/original/984f24a0-4d4b-4cd3-a5ca-bf04a24a0b65.jpeg?im_w=720", "https://a0.muscache.com/im/pictures/d1498446-3c89-4511-8ede-dab28ca50edb.jpg?im_w=720"],
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
          "imgUrl": "https://a0.muscache.com/im/pictures/user/05cffe3a-3573-47b2-b7c0-0bcc7cb53c87.jpg?im_w=240"
        },
        "loc": {
          "country": "United Kingdom",
          "countryCode": "UK",
          "address": "London",
          "lat": 51.509865,
          "lng": -0.118092
        },
        "reviews": []

      },
      {
        "_id": "10006563",
        "name": "Bohemian and Chic in LA",
        "imgUrls": ["https://a0.muscache.com/im/pictures/a4e3488f-f601-41d4-aab4-5d339543f161.jpg?im_w=720", "https://a0.muscache.com/im/pictures/d3f63630-df9d-4ae8-a56f-15299047550f.jpg?im_w=720", "https://a0.muscache.com/im/pictures/885e1071-b786-49d6-b689-9e0e30fd84d9.jpg?im_w=720", "https://a0.muscache.com/im/pictures/fd17b546-5ecf-461f-ae41-b3efd0b3ca28.jpg?im_w=720", "https://a0.muscache.com/im/pictures/66ce26ed-3046-4b1c-adab-cdf350fb83ee.jpg?im_w=720"],
        "price": 135.00,
        "summary": "Stay in this newly renovated, bright and modern studio that packs a full great deal in its space. It welcomes you with full amenities to accommodate your needs for a pleasant stay. The place is located at the heart of Bixby Knolls and Long Beach, 20 minutes away from Disneyland, 5 minutes from Long Beach Airport, 25 mins from LAX and some neighboring great sites like Queen Mary, Aquarium of the Pacific and shopping and restaurants at the Long Beach Hangar",
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
          "_id": "21382321",
          "fullname": "Michael Moore",
          "imgUrl": "https://a0.muscache.com/im/pictures/user/5a07ae70-41cd-4ba1-ac9d-fef81ad4e3fb.jpg?im_w=240"
        },
        "loc": {
          "country": "United States",
          "countryCode": "USA",
          "address": "Los Angeles",
          "lat": 34.052235,
          "lng": -118.243683
        },
        "reviews": []

      },
      {
        "_id": "10006566",
        "name": "Trendy house in Hollywood",
        "imgUrls": ["https://a0.muscache.com/im/pictures/77d8ef5e-8a57-440d-b8f4-3d3ea95214ce.jpg?im_w=720","https://a0.muscache.com/im/pictures/41f1888f-d550-4b3b-84ba-2aa703c5d182.jpg?im_w=720", "https://a0.muscache.com/im/pictures/d2434e46-9d33-40f0-b6b7-bab8ca94006c.jpg?im_w=720", "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-37258899-unapproved/original/44b83846-557b-4272-9550-4f81d9ecf55f.JPEG?im_w=720", "https://a0.muscache.com/im/pictures/c2e0cd65-f4b6-4fbd-ab46-497d237d07d1.jpg?im_w=720"],
        "price": 128.00,
        "summary": "Luxurious and simple, our house is tucked away amongst in the flowers and trees of a tranquil sanctuary garden, on one of the most private and quiet drives (with some of the best canyon views) in Topanga.",
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
          "_id": "72312321",
          "fullname": "Rubi Perez",
          "imgUrl": "https://a0.muscache.com/im/pictures/user/45ebecdb-0ce4-4134-86dd-c7f49957f488.jpg?im_w=240"
        },
        "loc": {
          "country": "United States",
          "countryCode": "USA",
          "address": "Los Angeles",
          "lat": 34.052235,
          "lng": -118.243683
        },
        "reviews": [{
          "id": "43494708",
          "txt": "Both hands clap for the beauty, artistry, nature and peacefulness of Shangrilala. One hand claps for the hundred-some steep steps to reach that nirvana, sleeping loft and aerie baño.",
          "rate": 5,
          "by": {
            "_id": "u111",
            "fullname": "Ephraim Nethanael",
            "imgUrl": "https://a0.muscache.com/im/users/6366029/profile_pic/1368458816/original.jpg?im_w=240"
          },
          
        }]
        
      },
      {
        "_id": "10073566",
        "name": "Apartment near Eiffel Tower",
        "imgUrls": ["https://a0.muscache.com/im/pictures/be0cacdf-bab1-4734-b74e-b1f8c2977125.jpg?im_w=720", "https://a0.muscache.com/im/pictures/a65d6a60-657b-4f6a-a5a8-8ef956316d5c.jpg?im_w=720", "https://a0.muscache.com/im/pictures/2fa36630-f4b5-403a-8c76-398e2a64fb34.jpg?im_w=720", "https://a0.muscache.com/im/pictures/3d1191ac-29b6-4261-8993-1ef9d597c805.jpg?im_w=720", "https://a0.muscache.com/im/pictures/bd7c88a2-611d-4917-be5a-3c10f4a3c70a.jpg?im_w=720"],
        "price": 108.00,
        "summary": "..In the heart of the 7Th District... One of the best and typical \"Quartier parisien\"... Near The Eiffel Tower, Invalides Dome, Rodin museum, Champs de Mars park and the famous and typical parisian Rue CLER market... Luxury studios for rental...",
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
          "_id": "864312322",
          "fullname": "Armen Argento",
          "imgUrl": "https://a0.muscache.com/im/pictures/user/21dff0f8-809e-4059-88c0-7476c237d240.jpg?im_w=240"
        },
        "loc": {
          "country": "France",
          "countryCode": "FR",
          "address": "Paris",
          "lat": 48.864716,
          "lng": 2.349014
        },
        "reviews": [{
          "id": "93494708",
          "txt": "Good place to stay near the Eiffel Tower. My only concern was the lack of an elevator (would not recommend for disabled guests).",
          "rate": 5,
          "by": {
            "_id": "u151",
            "fullname": "Benjamin",
            "imgUrl": "https://a0.muscache.com/im/pictures/user/241235da-1580-4a88-bcca-8a9c86c3233b.jpg?im_w=240"
          },
          
        },
        {
          "id": "93426908",
          "txt": "Very responsive, very clean and great location. The food around the area is great. This Airbnb will not disappoint",
          "rate": 5,
          "by": {
            "_id": "u321",
            "fullname": "Rob",
            "imgUrl": "https://a0.muscache.com/im/pictures/user/f99c913e-b641-4363-9145-8f6440c3c11c.jpg?im_w=240"
          },
          
        },
        {
          "id": "93426908",
          "txt": "The apartment (and room where I stayed) was better than I expected. It had all the amenities you’ll need. The place is very stylish and convenient. Armen was kind and responsive.",
          "rate": 5,
          "by": {
            "_id": "u321",
            "fullname": "Diego",
            "imgUrl": "https://a0.muscache.com/im/pictures/user/cb68fbe2-3c9e-4301-b491-6d55d897bc8b.jpg?im_w=240"
          },
          
        },
        {
          "id": "93425408",
          "txt": "Amazing place to stay at in the heart of Paris!!",
          "rate": 5,
          "by": {
            "_id": "u331",
            "fullname": "Bella",
            "imgUrl": "https://a0.muscache.com/im/pictures/user/749b9686-6796-4441-ad8c-60252f4630ce.jpg?im_w=240"
          },
          
        },
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
