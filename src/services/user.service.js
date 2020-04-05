// import { utilService } from "./util.service.js";
import httpService from "./http.service.js";

export const userService = {
  query,
  getById,
  remove,
  save,
  getEmptyUser,
  login,
  logout,

};



async function getById(userId) {
  return await httpService.get(`user/${userId}`);
}

function getEmptyUser() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    createdAt: Date.now(),
    languages: [""],
    userImgUrl: "",
    isAdmin: false,
    rating: 0,
    bio: "",
    tourId: null
  }
};

async function query() {
  return httpService.get(`user`)
}

async function remove(userId) {
  return await httpService.delete(`user/${userId}`);
}

function save(user) {
  return user._id ? _update(user) : _signup(user);
}

async function login(userCred) {
  const user = await httpService.post("auth/login", userCred);
  return _handleLogin(user);
}

function _handleLogin(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
}

async function _signup(user) {
  const account = await httpService.post("auth/signup", user);
  return _handleLogin(account);
}

async function _update(user) {
  return await httpService.put(`user/${user._id}`, user);
}

async function logout() {
  await httpService.post('auth/logout');
  sessionStorage.clear();
}




// function _createUser() {
//   return [
    // {
    //   firstName: "Zachary",
    //   lastName: "Adams",
    //   email: "a@a.com",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Hebrew"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886407/zack-min_iayztj.png",
    //   isAdmin: true,
    //   rating: 5,
    //   bio: "Hi I'm Zachary! I love live music, art and meeting new people (:",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Manhattan's Best Roof Tops",
    //     city: "New York",
    //     desc:
    //       "A city that excels in making the most of what it's got, New York has a roster of rooftop bars that's second to none, capitalizing on Manhattan's stunning skyline and reliably compelling views. If you’re looking for some of the best bars in New York, there’s no better place to start than on a roof.",
    //     tags: ["Food", "Drinks", "Night life"],
    //     spots: [
    //       { name: "Chinatown", loc: { lat: 40.7157509, lng: -73.9970307 } },
    //       {
    //         name: "World Trade Center",
    //         loc: { lat: 40.7118011, lng: -74.0131196 }
    //       },
    //       {
    //         name: "The Ritz-Carlton New York, Central Park",
    //         loc: { lat: 40.7652719, lng: -73.97599919999999 }
    //       },
    //       {
    //         name: "Empire State Building",
    //         loc: { lat: 40.7484405, lng: -73.98566439999999 }
    //       }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887558/ny-roof-top-min_xrhztp.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "Berlin",
    //     fromDate: "1/7/20",
    //     toDate: "20/7/20"
    //   }
    // },
    // {
    //   firstName: "Gordon",
    //   lastName: "Parker",
    //   email: "a",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886254/gordon-min_qohmhr.png",
    //   isAdmin: false,
    //   rating: 3,
    //   bio: "Hi I'm Gordon, a third generation New Yorker.",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Harlem Jazz Tour",
    //     city: "New York",
    //     desc:
    //       "I've always felt most at home in jazz joints. That's where my people are - the players and the fans; they've inspired me my whole working life. I've owned a jazz club in Harlem and will show you the best spots in town!",
    //     tags: ["Food", "Drinks", "Live Music"],
    //     spots: [],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887540/ny-jazz-min_hizsp3.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Laura",
    //   lastName: "Evans",
    //   email: "b",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886298/laura-min_mplzsi.png",
    //   isAdmin: true,
    //   rating: 5,
    //   bio: "Hello, I'm Laura, tattoo artist from UK.",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Best of Shoreditch",
    //     city: "London",
    //     desc:
    //       "Discover the best things to do, see, eat and drink in London’s Shoreditch, from indie shops to tasty street food. Some say Shoreditch has had its day, that London’s trendy brigade have moved on. If you go to Brick Lane Market, though, it doesn’t look that way. The weird and wonderfully dressed hordes keep coming to Shoreditch, packing into ramshackle bars and independent shops in and around the rough triangle made up by Old Street, Great Eastern Street and Shoreditch High Street. Whether you’re purchasing a few succulents from Columbia Road Flower Market, being entertained at the creative space Rich Mix, or sampling cultural delicacies from a nearby street food pop-up, there will always be something new to try in this busy corner of east London. ",
    //     tags: ["Bar", "Hipster", "Vegan"],
    //     spots: [
    //       { name: "Queen of Hoxton", loc: { lat: 51.522135, lng: -0.081235 } },
    //       {
    //         name: "The Old Blue Last",
    //         loc: { lat: 51.5244484, lng: -0.0800882 }
    //       },
    //       {
    //         name: "Barrio Shoreditch",
    //         loc: { lat: 51.5260442, lng: -0.0781866 }
    //       },
    //       { name: "Shoreditch", loc: { lat: 51.5229106, lng: -0.0777472 } }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887490/london-shore-min_z5vxxw.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "London",
    //     fromDate: "1/5/20",
    //     toDate: "1/6/20"
    //   }
    // },
    // {
    //   firstName: "London",
    //   lastName: "Mate",
    //   email: "c@c.com",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886319/london-min_d8uhux.png",
    //   isAdmin: false,
    //   rating: 4,
    //   bio:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    //   tour: {
    //     _id: null,
    //     name: "",
    //     city: "",
    //     desc: "",
    //     tags: [""],
    //     spots: [],
    //     price: null,
    //     tourImgUrls: ["", "", ""],
    //     availability: {},
    //     maxAttendees: null
    //   },
    //   nextTrip: {
    //     city: "Amsterdam",
    //     fromDate: "10/10/20",
    //     toDate: "11/11/20"
    //   }
    // },
    // {
    //   firstName: "Denis",
    //   lastName: "Pavlov",
    //   email: "d@d.com",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Russian"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886180/denis-min_nzw7c2.png",
    //   isAdmin: false,
    //   rating: 5,
    //   bio:
    //     "Hello! I am Denis, a native Russian who loves and hates his country with all his heart :)",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Moscow Night Tour",
    //     city: "Moscow",
    //     desc:
    //       "First time in Moscow? A small group of friends or a family? Then my tour can suit you well. Usually, we visit such places as the well-known Red Square and the best sites around and to amazing viewpoints that all tourists miss! The start time is flexible. The duration is also up to you, usually 5-7 hours.",
    //     tags: ["Night life", "Food", "Drinks"],
    //     spots: [
    //       {
    //         name: "Bolshoi Theatre",
    //         loc: { lat: 55.76013349999999, lng: 37.6186486 }
    //       },
    //       {
    //         name: "Red Square",
    //         loc: { lat: 55.75393030000001, lng: 37.620795 }
    //       },
    //       {
    //         name: "The Moscow Kremlin",
    //         loc: { lat: 55.7520233, lng: 37.6174994 }
    //       }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887467/moscow-min_xb98c5.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "Bali",
    //     fromDate: "11/11/20",
    //     toDate: "12/12/20"
    //   }
    // },
    // {
    //   firstName: "Russell",
    //   lastName: "Cook",
    //   email: "e",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Russian"],
    //   userImgUrl:
    //     "http://res.cloudinary.com/dlv6ajfir/image/upload/v1584834190/uuc1fhorx9jzxjn8cip0.jpg",
    //   isAdmin: false,
    //   rating: 4,
    //   bio:
    //     "Russell here. 35 yo, from good old London. I love cricket and Earl Gray.",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Spectacular London",
    //     city: "London",
    //     desc:
    //       "I invite you to join me to see Royal palaces and other iconic royal sites, We will start at Trafalgar Square and hear about its history and then move on to see the pomp and pageantry of the Changing of the Queen's Life Guard. Next is a short walk to Buckingham Palace where you will have more opportunities to take photos and hear stories of the Royal household. The final part of the walk takes us along Whitehall, past Downing Street (home of the Prime Minister) and then to the spot where King Charles 1st was executed. We will finish back at Trafalgar Square",
    //     tags: ["History", "Culture"],
    //     spots: [
    //       { name: "Buckingham Palace", loc: { lat: 51.501364, lng: -0.14189 } },
    //       {
    //         name: "Palace of Westminster",
    //         loc: { lat: 51.4994794, lng: -0.1248092 }
    //       },
    //       { name: "Trafalgar Square", loc: { lat: 51.508039, lng: -0.128069 } }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887438/london-city-min_he2huz.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "Bali",
    //     fromDate: "11/11/20",
    //     toDate: "12/12/20"
    //   }
    // },
    // {
    //   firstName: "Christian",
    //   lastName: "Blake",
    //   email: "j",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Romanian"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886148/christian-min_tcohqb.png",
    //   isAdmin: false,
    //   rating: 2,
    //   bio: "Hey, I'm Chris. But my friends call me sir Blake the 3rd. 🤴",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Camden Town - One of a Kind",
    //     city: "London",
    //     desc:
    //       "Once known as the Rock n Roll capital of the world, Camden Town is now a popular tourist destination offering many great things to do. From shopping at Camden Market to catching a live music gig at Koko, there’s always something to do, see, and eat in this neighborhood!",
    //     tags: ["Night life", "Live Music", "Drinks"],
    //     spots: [
    //       { name: "Camden Market", loc: { lat: 51.5416857, lng: -0.1460515 } },
    //       {
    //         name: "Camden Village",
    //         loc: { lat: 37.557808, lng: -121.9944207 }
    //       },
    //       {
    //         name: "Buck Street Market",
    //         loc: { lat: 51.5400278, lng: -0.1432287 }
    //       }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887403/london-camden-min_jyqre3.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Andrea",
    //   lastName: "Cavallo",
    //   email: "q",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Italian"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886097/andrea-min_nhmume.png",
    //   isAdmin: false,
    //   rating: 3,
    //   bio:
    //     "Ciao! Im Andrea and I've been in London for 10 years. I'm happy to show my favorite locations to new visitors",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Notting Hill Tour",
    //     city: "London",
    //     desc:
    //       "Enjoy a 1 hour 40 minute Notting Hill Tour with an expert local guide who will show you the highlights of this self styled chic urban oasis in West London. The area is famous for its annual street carnival, Portobello Rd market and the film of the same name starring Hugh Grant and Julia Roberts.  Your guide will give you the inside track showing you places of interest from famous film locations used in the neighbourhood to celebrity homes, the bustling Portobello Market, fashionable restaurants and bars, quiet mews and much much more.",
    //     tags: ["Food", "Drinks"],
    //     spots: [
    //       { name: "Notting Hill", loc: { lat: 51.5160125, lng: -0.2090148 } },
    //       {
    //         name: "Portobello Road Market",
    //         loc: { lat: 51.52089059999999, lng: -0.2090852 }
    //       }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887379/london-notthing-min_tesrey.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Gerald",
    //   lastName: "Wilona",
    //   email: "w",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Afrikaans", "Dutch"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886239/gerald-min_cp3xls.png",
    //   isAdmin: false,
    //   rating: 5,
    //   bio: "Born and raised in Cape Town. Spend most of my day at the beach 🏄‍♂️",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Cape Town Beauty",
    //     city: "Cape Town",
    //     desc:
    //       "You'll be exploring the best of what my city has to offer. Eat & explore like a local, with a local!",
    //     tags: ["Beach", "Penguins", "Nature"],
    //     spots: [
    //       {
    //         name: "Cape of Good Hope",
    //         loc: { lat: -34.3568425, lng: 18.4739882 }
    //       },
    //       { name: "Hout Bay", loc: { lat: -34.0208739, lng: 18.3682641 } },
    //       { name: "Boulders Beach", loc: { lat: -34.1972084, lng: 18.4512615 } }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887346/capetown-genral-min_dczrun.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Tristan",
    //   lastName: "Kores",
    //   email: "e",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Afrikaans", "Dutch"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886369/tristan-min_pzj6fl.png",
    //   isAdmin: false,
    //   rating: 4,
    //   bio: "(:",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "South African Glory",
    //     city: "Cape Town",
    //     desc:
    //       "Cape Town is surrounded by beautiful scenes, gorgeous views, spectacular coffee and rich history. It’s home to a treasure trove of hidden attractions and things to do - it’s no surprise that visitors and locals are always spoilt for choice when heading out for a day of adventure.",
    //     tags: ["Beach", "Mountains", "Nature"],
    //     spots: [
    //       { name: "Long St", loc: { lat: -33.922923, lng: 18.4186309 } },
    //       {
    //         name: "V & A Waterfront",
    //         loc: { lat: -33.9070041, lng: 18.4225974 }
    //       },
    //       { name: "Table Mountain", loc: { lat: -33.962822, lng: 18.4098406 } },
    //       { name: "Camps Bay", loc: { lat: -33.951298, lng: 18.3830983 } }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887320/capetown-camps-bay-min_rucrge.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Joseph",
    //   lastName: "Lisebo",
    //   email: "r",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "Afrikaans", "Dutch"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886273/joseph-min_jgvdax.png",
    //   isAdmin: false,
    //   rating: 5,
    //   bio:
    //     "I'm the founder of Culture Connect SA and gave up being an arts and education fundraiser, to be a Cape Town guide. I did my BA Hons in Art History in the UK and worked in London's art world for 20 years. (:",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Cape Town City",
    //     city: "Cape Town",
    //     desc:
    //       "All activities are designed to give you the most authentic experiences of Cape Town. Your tour will include visits to the Castle of Good Hope, the Parliament Buildings and Bo-Kaap, plus of course the iconic Table Mountain.",
    //     tags: ["Beach", "Mountains"],
    //     spots: [
    //       {
    //         name: "IZIKO BO-KAAP MUSEUM",
    //         loc: { lat: -33.9215332, lng: 18.4149866 }
    //       },
    //       { name: "Table Mountain", loc: { lat: -33.962822, lng: 18.4098406 } },
    //       { name: "Camps Bay", loc: { lat: -33.951298, lng: 18.3830983 } },
    //       {
    //         name: "V & A Waterfront",
    //         loc: { lat: -33.9070041, lng: 18.4225974 }
    //       },
    //       { name: "Long St", loc: { lat: -33.922923, lng: 18.4186309 } }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887299/capetown-city-min_une8zb.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 5
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Erica",
    //   lastName: "Schmidt",
    //   email: "s",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "German"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886196/erica-min_poxpvq.png",
    //   isAdmin: false,
    //   rating: 4,
    //   bio:
    //     "I am very dynamic and smiling, my energy and my stories, will surely captivate you for 2h30. I love to meet new people and spend time with them, I know how to adapt to my audience.",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Historical Berlin",
    //     city: "Berlin",
    //     desc:
    //       "I am passionate about Berlin History, especially about the period during the Wall. I propose an original experience along the old No man's land to discover life in the East and West but also to understand the evolution and atmosphere of this city. Why is this capital so unique today and how did it happen? My anecdotes and knowledge are accompanied by archive photos that I am constantly looking for. We discover the history of many places, witnesses of the past, what they have become or what they will become. These are for example: old buildings, squats, factories, clubs, to new alternative places and lots of other surprises.",
    //     tags: ["History", "Culture"],
    //     spots: [
    //       {
    //         name: "Reichstag Building",
    //         loc: { lat: 52.5186202, lng: 13.3761872 }
    //       },
    //       {
    //         name: "East Side Gallery",
    //         loc: { lat: 52.50502239999999, lng: 13.4396952 }
    //       },
    //       {
    //         name: "Berlin Wall",
    //         loc: { lat: 52.50718149999999, lng: 13.3835061 }
    //       }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887269/berlin-city-min_eyowqz.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 3
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
    // },
    // {
    //   firstName: "Chelsea",
    //   lastName: "Coleman",
    //   email: "z",
    //   password: "1",
    //   _id: utilService.makeId(),
    //   createdAt: Date.now(),
    //   languages: ["English", "German"],
    //   userImgUrl:
    //     "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584886126/Chelsea-min_g0v0ew.png",
    //   isAdmin: false,
    //   rating: 4,
    //   bio: "Hey There. I am a former English and Art teacher.",
    //   tour: {
    //     _id: utilService.makeId(),
    //     name: "Alternative Berlin",
    //     city: "Berlin",
    //     desc:
    //       "The tour will cover street art, graffiti, the art and alternative scene, history about Friedrichshain and Kreuzberg, street food and drinks, nightlife and clubs, immigrants, squats and much more and is fun for all ages. I will provide you with tips and lots of infos for the rest of your stay. I suggest you do this experience as soon as you arrive in Berlin because it will offer you a wide vision to optimize your stay.",
    //     tags: ["Urban Art", "Culture", "Alternative"],
    //     spots: [
    //       {
    //         name: "AVENUE Night Club Berlin",
    //         loc: { lat: 52.5196417, lng: 13.4224225 }
    //       },
    //       { name: "Watergate", loc: { lat: 52.5010558, lng: 13.4452521 } },
    //       { name: "Kreuzberg", loc: { lat: 52.4983442, lng: 13.4065791 } },
    //       {
    //         name: "Friedrichshain",
    //         loc: { lat: 52.51582399999999, lng: 13.4539891 }
    //       }
    //     ],
    //     price: utilService.getRandomInt(150, 1150),
    //     tourImgUrls: [
    //       "https://res.cloudinary.com/ddkf2aaiu/image/upload/v1584887250/berlin-2-min_r1fjnl.png"
    //     ],
    //     availability: {},
    //     maxAttendees: 3
    //   },
    //   nextTrip: {
    //     city: "",
    //     fromDate: "",
    //     toDate: ""
    //   }
  //   // }
  // ];


