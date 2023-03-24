import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import {
  colorsDiarys,
  Diary,
  EventDiary,
  EventDiaryDelete,
  IdDiary,
  RecycleBinDiary,
} from "@parsekonlepeu/diary";

export const createData = (): {
  diarys: Diary[];
  recycledBin: RecycleBinDiary[];
} => {
  let dataReturn: {
    diarys: Diary[];
    recycledBin: RecycleBinDiary[];
  } = {
    diarys: [],
    recycledBin: [],
  };
  const namesDiary = [
    {
      name: "mon agenda",
      numberEvent: 10,
      numberEventDel: 100,
    },
    {
      name: "bob",
      numberEvent: 8,
      numberEventDel: 10,
    },
    {
      name: "alice",
      numberEvent: 15,
      numberEventDel: 8,
    },
    {
      name: "pierre",
      numberEvent: 2,
      numberEventDel: 1000,
    },
  ];
  for (const diary of namesDiary) {
    const dateNow = DateTime.now();
    const id = uuidv4() as IdDiary;
    const timezone = "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris";
    const rand = Math.random();
    const description =
      rand < 0.5
        ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit maiores a itaque cum necessitatibus ipsam, blanditiis voluptatem et repellat voluptas."
        : "";
    const color = getRandomChoiceList(colorsDiarys);
    const listEvent: EventDiary[] = [];
    const listEventDel: EventDiaryDelete[] = [];
    // creation liste event display
    for (let i = 0; i < diary.numberEvent; i++) {
      const rand = Math.random();
      const date = getRandomDate(dateNow);
      const duration =
        rand < 0.5 ? getRandomInt(24 * 60) : getRandomInt(24 * 60 * 10);
      const duration_format = Math.ceil(duration / 15) * 15;
      const name = getRandomChoiceList(nameList);
      const idEvent = uuidv4();
      listEvent.push({
        color: color.rgb,
        title: name,
        id: idEvent,
        start: date.toObject(),
        startUnixInteger: date.toUnixInteger(),
        duration: duration_format,
        nameClient: "",
        allDay: rand < 0.2 ? true : false,
        type: "event",
        place: "",
        description: description,
        custom: "",
        nbRecurrence: 1,
        idDiary: id,
      });
    }
    // creation liste event corbeille
    for (let i = 0; i < diary.numberEventDel; i++) {
      const rand = Math.random();
      const date = getRandomDate(dateNow);
      const duration =
        rand < 0.5 ? getRandomInt(24 * 60) : getRandomInt(24 * 60 * 10);
      const name = getRandomChoiceList(nameList);
      const idEvent = uuidv4();
      listEventDel.push({
        color: color.rgb,
        title: name,
        id: idEvent,
        start: date.toObject(),
        startUnixInteger: date.toUnixInteger(),
        duration: duration,
        nameClient: "",
        allDay: rand < 0.3 ? true : false,
        type: "event",
        place: "",
        description: description,
        custom: "",
        nbRecurrence: 1,
        idDiary: id,
        dateDelete: getRandomDate(date.minus({ days: 31 })).toUnixInteger(),
        isClicked: false,
      });
    }
    dataReturn.diarys.push({
      id: id,
      title: diary.name,
      description: description,
      timezone: timezone,
      color: color.rgb,
      events: listEvent,
    });
    dataReturn.recycledBin.push({
      title: diary.name,
      color: color.rgb,
      idDiary: id,
      listEventDelete: listEventDel,
    });
  }
  return dataReturn;
};

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const getRandomDate = (dateNow: DateTime): DateTime => {
  return dateNow
    .plus({
      days: getRandomInt(30),
    })
    .set({
      minute: getRandomInt(3) * 15,
      hour: getRandomInt(23),
    });
};

const getRandomChoiceList = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

const nameList = [
  "Time",
  "Past",
  "Future",
  "Dev",
  "Fly",
  "Flying",
  "Soar",
  "Soaring",
  "Power",
  "Falling",
  "Fall",
  "Jump",
  "Cliff",
  "Mountain",
  "Rend",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gold",
  "Demon",
  "Demonic",
  "Panda",
  "Cat",
  "Kitty",
  "Kitten",
  "Zero",
  "Memory",
  "Trooper",
  "XX",
  "Bandit",
  "Fear",
  "Light",
  "Glow",
  "Tread",
  "Deep",
  "Deeper",
  "Deepest",
  "Mine",
  "Your",
  "Worst",
  "Enemy",
  "Hostile",
  "Force",
  "Video",
  "Game",
  "Donkey",
  "Mule",
  "Colt",
  "Cult",
  "Cultist",
  "Magnum",
  "Gun",
  "Assault",
  "Recon",
  "Trap",
  "Trapper",
  "Redeem",
  "Code",
  "Script",
  "Writer",
  "Near",
  "Close",
  "Open",
  "Cube",
  "Circle",
  "Geo",
  "Genome",
  "Germ",
  "Spaz",
  "Shot",
  "Echo",
  "Beta",
  "Alpha",
  "Gamma",
  "Omega",
  "Seal",
  "Squid",
  "Money",
  "Cash",
  "Lord",
  "King",
  "Duke",
  "Rest",
  "Fire",
  "Flame",
  "Morrow",
  "Break",
  "Breaker",
  "Numb",
  "Ice",
  "Cold",
  "Rotten",
  "Sick",
  "Sickly",
  "Janitor",
  "Camel",
  "Rooster",
  "Sand",
  "Desert",
  "Dessert",
  "Hurdle",
  "Racer",
  "Eraser",
  "Erase",
  "Big",
  "Small",
  "Short",
  "Tall",
  "Sith",
  "Bounty",
  "Hunter",
  "Cracked",
  "Broken",
  "Sad",
  "Happy",
  "Joy",
  "Joyful",
  "Crimson",
  "Destiny",
  "Deceit",
  "Lies",
  "Lie",
  "Honest",
  "Destined",
  "Bloxxer",
  "Hawk",
  "Eagle",
  "Hawker",
  "Walker",
  "Zombie",
  "Sarge",
  "Capt",
  "Captain",
  "Punch",
  "One",
  "Two",
  "Uno",
  "Slice",
  "Slash",
  "Melt",
  "Melted",
  "Melting",
  "Fell",
  "Wolf",
  "Hound",
  "Legacy",
  "Sharp",
  "Dead",
  "Mew",
  "Chuckle",
  "Bubba",
  "Bubble",
  "Sandwich",
  "Smasher",
  "Extreme",
  "Multi",
  "Universe",
  "Ultimate",
  "Death",
  "Ready",
  "Monkey",
  "Elevator",
  "Wrench",
  "Grease",
  "Head",
  "Theme",
  "Grand",
  "Cool",
  "Kid",
  "Boy",
  "Girl",
  "Vortex",
  "Paradox",
];
