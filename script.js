document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const navTabs = document.querySelectorAll(".nav-tab");
  const pages = document.querySelectorAll(".page");
  const scanCardButton = document.getElementById("scanCard");
  const manualInputButton = document.getElementById("manualInput");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const collectionGrid = document.getElementById("collectionGrid");
  const sortNumber = document.getElementById("sortNumber");
  const sortCompetitor = document.getElementById("sortCompetitor");
  const sortEntrance = document.getElementById("sortEntrance");
  const collectionSearch = document.getElementById("collectionSearch");
  const toggleRemoveButton = document.getElementById("toggleRemoveMode");
  const createDeckButton = document.getElementById("createDeck");
  const deckList = document.getElementById("deckList");

  // Data storage
  let collection = [];
  let decks = [];
  let removeMode = false;
  
  // Card database: each card object can be customized here.
  // You can specify if a card is sorted by number, competitor, or entrance by
  // assigning appropriate values to these fields.
  let cardDatabase = [
    // #1
    // {name:"",number:1,competitor:"",entrance:"",image:""},
    { name: "American Double Punch", number: 1, competitor: "", entrance: "", image: "https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/1-American-Double-Punch.jpg?fit=450%2C614&ssl=1" },
    { name: "Body Punches", number: 1, competitor:"", entrance: "", image: "https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Body-Punches.jpg?fit=450%2C614&ssl=1" },
    { name: "Boot off the Apron", number: 1, competitor:"", entrance:"", image: "https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/01-BootOfTheApron.png?fit=1502%2C2048&ssl=1" },
    { name:"Boss-Rate Boot", number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/1-Boss-Rate-Boot.jpg?fit=450%2C614&ssl=1"},
    {name:"Chain-Wrapped Fist",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Chain-Wrapped-Fist.jpg?fit=1502%2C2048&ssl=1"},
    {name: "Cheap Shot", number:1, competitor:"", entrance:"", image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Cheap-Shot.jpg?fit=450%2C614&ssl=1" },
    {name:"Chop Down", number:1, competitor:"", entrance: "", image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Chop-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Chop in the Corner",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Chop-in-the-Corner.jpg?fit=450%2C614&ssl=1"},
    {name:"Chortling Low Blow",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/02/1-Chortling-Low-Blow.jpg?fit=450%2C614&ssl=1"},
    {name:"Cold Snap",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/1-Cold-Snap.jpg?fit=450%2C614&ssl=1"},
    {name:"Cosmic Smash",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/1-Cosmic-Smash-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Deflect",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/1-Deflect.jpg?fit=450%2C614&ssl=1"},
    {name:"Drumstick Solo",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-DrumstickSolo.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Eye Poke",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/1-Eye-Poke.jpg?fit=450%2C614&ssl=1"},
    {name:"Felt That",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/1-Felt-That.jpg?fit=450%2C614&ssl=1"},
    {name:"Finger Poke of Doom",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Finger-Poke-of-Doom.jpg?fit=450%2C614&ssl=1"},
    {name:"Flying Super Snape Face Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Flying-Super-Snap-Face-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Gunfire",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/1-Gunfire.jpg?fit=450%2C614&ssl=1"},
    {name:"Hold Back",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/01-PushBack.png?fit=1502%2C2048&ssl=1"},
    {name:"Kendo Stick",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Kendo-Stick.jpg?fit=450%2C614&ssl=1"},
    {name:"Knuckle Sandwich",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Knuckle-Sandwich.jpg?fit=450%2C614&ssl=1"},
    {name:"Knock It off",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Knock-It-Off.jpg?fit=450%2C614&ssl=1"},
    {name:"Knuckle Up",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/1-Knuckle-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Ladder",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Ladder.jpg?fit=450%2C614&ssl=1"},
    {name:"Leap Frog",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Leap-Frog.jpg?fit=450%2C614&ssl=1"},
    {name:"Ledgendary Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/1-Legendary-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Lift the Boot",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Lift-the-Boot.jpg?fit=450%2C614&ssl=1"},
    {name:"Monogolian Chop",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Mongolian-Chop.jpg?fit=450%2C614&ssl=1"},
    {name:"Machine Gun Chops",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Machine-Gun-Chops.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Mule Kick",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/1-Mule-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"One-Two Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-One-Two-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Overshot",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Overshot.jpg?fit=450%2C614&ssl=1"},
    {name:"Palm Strike",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Palm-Strike.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Pineapple",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/1-Pineapple.jpg?fit=450%2C614&ssl=1"},
    {name:"Rib Jab",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/1-Rib-Jab.jpg?fit=450%2C614&ssl=1"},
    {name:"Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/01/1-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Sheepish Collection",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/1-Sheepish-Collection.jpg?fit=450%2C614&ssl=1"},
    {name:"Smack in the Head",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/1-Smack-in-the-Head.jpg?fit=450%2C614&ssl=1"},
    {name:"Smack in the Head",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/1-Smack-in-the-Head-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Snap Punch",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Snap-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Splash off the Apron",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/01-SplashOffTheApron.png?fit=1502%2C2048&ssl=1"},
    {name:"Stiff Right Hand",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/01-Stiff-Right-Hand.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Tackle",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Tackle.jpg?fit=450%2C614&ssl=1"},
    {name:"Thunderbolt & Lightning Very, Very Frightening!",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/1-Thunderbolt-Lightning-Very-Very-Frightening.jpg?fit=450%2C614&ssl=1"},
    {name:"Springboard",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/1-Springboard.jpg?fit=450%2C614&ssl=1"},
    {name:"Trip Up",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/1-Trip-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Volley of Strikes",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Volley-of-Strikes.jpg?fit=450%2C614&ssl=1"},
    {name:"Wind Up",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/09/1-Wind-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Yellow Card",number:1,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/1-Yellow-Card-1.jpg?fit=450%2C614&ssl=1"},
    // #2
    // {name:"",number:2,competitor:"",entrance:"",image:""},
    {name:"2 Handed Toss",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-2-Handed-Toss.jpg?fit=450%2C614&ssl=1"},
    {name:"Alabama Slam",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/02-Alabama-Slam.jpg?fit=1502%2C2048&ssl=1"},
    {name:"All American Stomps",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/2-All-American-Stomps.jpg?fit=450%2C614&ssl=1"},
    {name:"Arm & Collar Tie Up",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Arm-Collar-Tie-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Backcracker",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/2-Backcracker.jpg?fit=450%2C614&ssl=1"},
    {name:"Brain Games",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/2-Brain-Games.jpg?fit=450%2C614&ssl=1"},
    {name:"Brotherly Love",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/2-Brotherly-Love-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Burn Down",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/2-Burn-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Chain Wrestling",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Chain-Wrestling.jpg?fit=450%2C614&ssl=1"},
    {name:"Chare Into The Corner",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Charge-into-the-Corner.jpg?fit=450%2C614&ssl=1"},
    {name:"Clean Break",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/02-Clean-Break.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Close Combat",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/2-Close-Combat.jpg?fit=450%2C614&ssl=1"},
    {name:"Divert",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Divert.jpg?fit=450%2C614&ssl=1"},
    {name:"Dog Collar Face-Off",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/02-DogCollarFaceOff.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Double Underhook Brainbuster",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/02-DoubleUnderHookBrainBuster.png?fit=1502%2C2048&ssl=1"},
    {name:"Flying Diving Corner Steel Chair Leg Sault",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/2-Flying-Diving-Corner-Steel-Chair-Leg-Sault.jpg?fit=450%2C614&ssl=1"},
    {name:"Grapple for Position",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Grapple-for-Position.jpg?fit=450%2C614&ssl=1"},
    {name:"Guitar Riff",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/05/2-Guitar-Riff.jpg?fit=450%2C614&ssl=1"},
    {name:"Head Grab",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Head-Grab.jpg?fit=450%2C614&ssl=1"},
    {name:"Head Toss",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Head-Toss.jpg?fit=450%2C614&ssl=1"},
    {name:"Impact Drop",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/2-Impact-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Kitty-Cat-A-Pult",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/2-Kitty-Cat-a-Pult.jpg?fit=450%2C614&ssl=1"},
    {name:"Lock Up",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Lock-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Look For An Opening",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/2-Look-For-An-Opening.jpg?fit=450%2C614&ssl=1"},
    {name:"Low Bridge",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/02-Low-Birdge.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Momentum Swing",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/2-Momentum-Swing.jpg?fit=450%2C614&ssl=1"},
    {name:"Overpowered",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Overpowered.jpg?fit=450%2C614&ssl=1"},
    {name:"Peg Leg Potion #2",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/2-Peg-Leg-Potion-2.jpg?fit=450%2C614&ssl=1"},
    {name:"Pineapple For Sheep?",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/2-Pineapple-for-Sheep-1.jpg?fit=450%2C614&ssl=1"},
    {name:"The Ref Takes Charge",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/02-TheRefTakesCharge.png?fit=1502%2C2048&ssl=1"},
    {name:"Reload",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/2-Reload.jpg?fit=450%2C614&ssl=1"},
    {name:"Sealed You In",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/2-Sealed-You-In.jpg?fit=450%2C614&ssl=1"},
    {name:"Shake Down",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Shake-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Slam Down",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Slam-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Slam Suplex Head Breaker Drop",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Slam-Suplex-Head-Breaker-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Smash Into the Cage",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/2-Smash-Into-the-Cage.jpg?fit=450%2C614&ssl=1"},
    {name:"Smash Into the Cage",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/2-Smash-Into-the-Cage-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Standoff",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Standoff.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel Chair",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Steel-Chair.jpg?fit=450%2C614&ssl=1"},
    {name:"Swift Arm Wrestling",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/01/2-Swift-Arm-Wrestling.png?fit=450%2C614&ssl=1"},
    {name:"Swing and a Hit",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/2-Swing-and-a-Hit.jpg?fit=450%2C614&ssl=1"},
    {name:"Table",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Table.jpg?fit=450%2C614&ssl=1"},
    {name:"Take You for a Ride",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/02-TakeYouForARide.png?fit=1502%2C2048&ssl=1"},
    {name:"Taking Control",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Taking-Control.jpg?fit=450%2C614&ssl=1"},
    {name:"Tandem Takedown",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Tandem-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Tornado DDT",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/2-Tornado-DDT.jpg?fit=450%2C614&ssl=1"},
    {name:"Toss From the Turnbuckle",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/2-Toss-From-the-Turnbuckle.jpg?fit=450%2C614&ssl=1"},
    {name:"Trash Can",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/2-Trash-Can-Con-Alt.jpg?fit=450%2C614&ssl=1"},
    {name:"Wheelbarrow Slam",number:2,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/2-Wheelbarrow-Slam.jpg?fit=450%2C614&ssl=1"},
    // #3
    // {name:"",number:3,competitor:"",entrance:"",image:""},
    {name:"3/4 Wrist Lock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-3-4-Wrist-Lock.jpg?fit=450%2C614&ssl=1"},
    {name:"A Room Full of Rocking Chairs",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/3-A-Room-Full-of-Rocking-Chairs.jpg?fit=450%2C614&ssl=1"},
    {name:"America Fires Back",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/3-America-Fires-Back-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Anaconda Vice",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/03-Anaconda-Vice.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Break It Up",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/03-BreakItUp.png?fit=1502%2C2048&ssl=1"},
    {name:"Capture Headlock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/03-CaptureHeadlock.png?fit=1502%2C2048&ssl=1"},
    {name:"Chin Lock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Chin-Lock.jpg?fit=450%2C614&ssl=1"},
    {name:"Closed Mind",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/3-Closed-Mind.jpg?fit=450%2C614&ssl=1"},
    {name:"Clutch Onto Opponent",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Clutch-Onto-Opponent.jpg?fit=450%2C614&ssl=1"},
    {name:"Double Headlock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Double-Headlock.jpg?fit=450%2C614&ssl=1"},
    {name:"Eye Gouge",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Eye-Gouge.jpg?fit=450%2C614&ssl=1"},
    {name:"Face Rake",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Face-Rake.jpg?fit=450%2C614&ssl=1"},
    {name:"Face Twist",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Face-Twist.jpg?fit=450%2C614&ssl=1"},
    {name:"Friends and Rivals",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/3-Friends-and-Rivals-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Frog Slime Potion #03",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/3-Frog-Slime-Potion-03.jpg?fit=450%2C614&ssl=1"},
    {name:"Get the Higher Ground",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/3-Get-the-Higher-Ground.jpg?fit=450%2C614&ssl=1"},
    {name:"Go Behind",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Go-Behind.jpg?fit=450%2C614&ssl=1"},
    {name:"Handshake of Doom!",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/3-Handshake-of-Doom.jpg?fit=450%2C614&ssl=1"},
    {name:"Headlock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Headlock.jpg?fit=450%2C614&ssl=1"},
    {name:"Hog Tie",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Hog-Tie.jpg?fit=450%2C614&ssl=1"},
    {name:"Hold Over",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Hold-Over.jpg?fit=450%2C614&ssl=1"},
    {name:"Hyper Forearm Kicker Hold Choke",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Hyper-Forearm-Kicker-Hold-Choke.jpg?fit=450%2C614&ssl=1"},
    {name:"Joint Manipulation",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/3-Joint-Manipulation.jpg?fit=450%2C614&ssl=1"},
    {name:"Knee to the Back",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/3-Knee-to-the-Back.jpg?fit=450%2C614&ssl=1"},
    {name:"Koji Clutch",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/03-Koji-Clutch.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Lockjaw",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/3-Lockjaw.jpg?fit=450%2C614&ssl=1"},
    {name:"Microphone Swing",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/3-Microphone-Swing.jpg?fit=450%2C614&ssl=1"},
    {name:"Money Talks",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/3-Money-Talks.jpg?fit=450%2C614&ssl=1"},
    {name:"Overheat",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/3-Overheat.jpg?fit=450%2C614&ssl=1"},
    {name:"Power Struggle",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/3-Power-Struggle.jpg?fit=450%2C614&ssl=1"},
    {name:"Psychic Ability",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/3-Psychic-Ability.jpg?fit=450%2C614&ssl=1"},
    {name:"Ring Steps",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Ring-Steps.jpg?fit=450%2C614&ssl=1"},
    {name:"Short Squeeze Hold",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/3-Short-Squeeze-Hold.jpg?fit=450%2C614&ssl=1"},
    {name:"Short Squeeze Hold",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/3-Short-Squeeze-Hold-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Side Sleeper Hold",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/03-SideSleeperHold.png?fit=1502%2C2048&ssl=1"},
    {name:"Sledgehammer",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/3-Sledgehammer.jpg?fit=450%2C614&ssl=1"},
    {name:"Smother",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Smother.jpg?fit=450%2C614&ssl=1"},
    {name:"Snap Headlock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Snap-Headlock.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel Chain",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Steel-Chain.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel Chain",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/03-Steel-ChainV2.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Stomp You Out",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/3-Stomp-You-Out.jpg?fit=450%2C614&ssl=1"},
    {name:"Swinging Headlock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/3-Swinging-Headlock.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunted by the Heated Fans",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/3-Taunted-by-the-Heated-Fans.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunt From the Apron",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/03-Taunt-from-the-Apron.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Test of Strength",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Test-of-Strength.jpg?fit=450%2C614&ssl=1"},
    {name:"Twist and Tangle",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Twist-and-Tangle.jpg?fit=450%2C614&ssl=1"},
    {name:"Twisting Wrist Lock",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/3-Twisting-Wrist-Lock.jpg?fit=450%2C614&ssl=1"},
    {name:"Wear Down",number:3,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/3-Wear-Down.jpg?fit=450%2C614&ssl=1"},
    // #4
    // {name:"",number:4,competitor:"",entrance:"",image:""},
    {name:"A Boss Photobomb",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/02/4-A-Boss-Photobomb.jpg?fit=450%2C614&ssl=1"},
    {name:"Apocalypse",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Apocalypse.jpg?fit=450%2C614&ssl=1"},
    {name:"Blast",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/4-Blast.jpg?fit=450%2C614&ssl=1"},
    {name:"Body Shot",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Body-Shot.jpg?fit=450%2C614&ssl=1"},
    {name:"Candy Crunch",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/4-Candy-Crunch.jpg?fit=450%2C614&ssl=1"},
    {name:"Capoeira Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/4-Capoeira-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Cosmic Collection",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/4-Cosmic-Collection-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Double Chop",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Double-Chop.jpg?fit=450%2C614&ssl=1"},
    {name:"Faceplant",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/04-Faceplant.png?fit=1502%2C2048&ssl=1"},
    {name:"Flash Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/4-Flash-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Flip Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/4-Flip-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Drumstick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/04-GoingOverTheDrumstick.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Going Over the Kendo Stick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Going-Over-the-Kendo-Stick.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Ladder",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Going-Over-the-Ladder.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Pineapple",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/02/4-Going-OVer-the-Pineapple.jpg?fit=450%2C614&ssl=1"},
    {name:"Haymaker Punch",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Haymaker-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Irish Whip",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Irish-Whip.jpg?fit=450%2C614&ssl=1"},
    {name:"Jaw Jacking",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/04-JawJacking.png?fit=1502%2C2048&ssl=1"},
    {name:"Kawada Kicks",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/04-Kawada-Kicks.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/4-Kick-Strike.jpg?fit=450%2C614&ssl=1"},
    {name:"Kicks to the Gut",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Kicks-to-the-Gut.jpg?fit=450%2C614&ssl=1"},
    {name:"Meditate",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/4-Meditate.jpg?fit=450%2C614&ssl=1"},
    {name:"Moon Drop",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/04-MoonDrop.png?fit=1502%2C2048&ssl=1"},
    {name:"Not Today, Joka!",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/4-Not-Today-Joka.jpg?fit=450%2C614&ssl=1"},
    {name:"Old School",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/4-Old-School.jpg?fit=450%2C614&ssl=1"},
    {name:"PAX a Punch",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/04-paxapunch.jpeg?fit=1502%2C2048&ssl=1"},
    {name:"Pixel Palace Punch",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/4-Pixel-Palace-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Rivalry Heating Up",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/4-Rivalry-Heating-Up-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Running Elbow Smash",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/4-Running-Elbow-Smash.jpg?fit=450%2C614&ssl=1"},
    {name:"Shotgun Clothesline",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/04-ShotgunClotheslinePW8-1.png?fit=1502%2C2048&ssl=1"},
    {name:"Single Leg Dropkick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/04-Single-Leg-Dropkick.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Skull Smash",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Skull-Smash.jpg?fit=450%2C614&ssl=1"},
    {name:"Slash Into a Trash Can",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/4-Slash-Into-a-Trash-Can.jpg?fit=450%2C614&ssl=1"},
    {name:"Snap Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Snap-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Spin Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Spin-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Spinning Thrust Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/4-Spinning-Thrust-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Standing Senton",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/4-Standing-Senton.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel-Tipped Boot",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/4-Steel-Tipped-Boot.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel-Tipped Boot",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/4-Steel-Tipped-Boot-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Swift Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Swift-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Swinging Elbow",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/4-Swinging-Elbow.jpg?fit=450%2C614&ssl=1"},
    {name:"Thigh Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/04-Thigh-Kick.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Thumb to the Eye",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Thumb-to-the-Eye.jpg?fit=450%2C614&ssl=1"},
    {name:"Toothbrush Smash of Shinyness",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/4-Toothbrush-Smash-of-Shinyness.jpg?fit=450%2C614&ssl=1"},
    {name:"Tornado Kick",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/4-Tornado-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Twisting Lash",number:4,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/04-TwistingLash.jpg?fit=1502%2C2048&ssl=1"},
    // #5
    // {name:"",number:5,competitor:"",entrance:"",image:""},
    {name:"American Triple Skull Slam",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/5-American-Triple-Skull-Slam.jpg?fit=450%2C614&ssl=1"},
    {name:"Apron Bomb",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/5-Apron-Bomb.jpg?fit=450%2C614&ssl=1"},
    {name:"Bash",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/5-Bash.jpg?fit=450%2C614&ssl=1"},
    {name:"Biel Throw",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/5-Biel-Throw.jpg?fit=450%2C614&ssl=1"},
    {name:"Calling on the Fire Brigade",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/5-Calling-On-the-Fire-Brigade.jpg?fit=450%2C614&ssl=1"},
    {name:"Catch Chicken Wing",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/5-Catch-Chicken-Wing-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Colossal Clash",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/5-Colossal-Clash.jpg?fit=450%2C614&ssl=1"},
    {name:"Crunching Chain Assault",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/05-CrunchingSteelChainAssault.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Deadlocked",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/5-Deadlocked.jpg?fit=450%2C614&ssl=1"},
    {name:"Double Underhook DDT",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/05-Double-Underhook-DDT.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Drop Out of the Ring",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Drop-Out-of-the-Ring.jpg?fit=450%2C614&ssl=1"},
    {name:"Eat Steel",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/5-Eat-Steel.jpg?fit=450%2C614&ssl=1"},
    {name:"Eat Steel",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/5-Eat-Steel-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Elevated Arm Drag",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Elevated-Arm-Drag.jpg?fit=450%2C614&ssl=1"},
    {name:"Florida Aggro",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/05-FloridaAggro.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Going Over the Guitar",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/05/5-Going-Over-the-Guitar.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Steel Chair",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Going-Over-the-Steel-Chair.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Table",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Going-Over-the-Table.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Trashcan",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/02/5-Going-Over-the-Trash-Can.jpg?fit=450%2C614&ssl=1"},
    {name:"The Grump Train",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/5-The-Grump-Train.jpg?fit=450%2C614&ssl=1"},
    {name:"Head Drop",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/05-HeadDrop.png?fit=1502%2C2048&ssl=1"},
    {name:"High Speed Suplex",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-High-Speed-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Hip Toss",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Hip-Toss.jpg?fit=450%2C614&ssl=1"},
    {name:"Jawbreaker",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/05-Jawbreaker.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Legendary Lockdown",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/05-LegendaryLockdownPW8-1.png?fit=550%2C750&ssl=1"},
    {name:"Neck Drop",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Neck-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"New Magazine",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/5-New-Magazine.jpg?fit=450%2C614&ssl=1"},
    {name:"Overhead Throw",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Overhead-Throw.jpg?fit=450%2C614&ssl=1"},
    {name:"One-Handed Bulldog",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/5-One-Handed-Bulldog.jpg?fit=450%2C614&ssl=1"},
    {name:"Power Up",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Power-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Refuge Supershow!",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/05/5-Refuge-Supershow.jpg?fit=450%2C614&ssl=1"},
    {name:"Rejected!",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Rejected.jpg?fit=450%2C614&ssl=1"},
    {name:"Roll, Twist, Chug!",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/5-Roll-Twist-Chug-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Series of Hip Tosses",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Series-of-Hip-Tosses.jpg?fit=450%2C614&ssl=1"},
    {name:"Sidewind Wonder-Plex",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/05-SidewindWonder-Plex.png?fit=1502%2C2048&ssl=1"},
    {name:"Single Leg Takedown",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Single-Leg-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Super Hip Toss",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Super-Hip-Toss.jpg?fit=450%2C614&ssl=1"},
    {name:"Surfboard Slam",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/05-SurfboardSlam.png?fit=1502%2C2048&ssl=1"},
    {name:"Surprise Bulldog",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/5-Surprise-Bulldog.jpg?fit=450%2C614&ssl=1"},
    {name:"Swinging Cutter",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/05-SwingingCutter.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Swing and a Sledgehammer",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/5-Swing-and-a-Sledgehammer.jpg?fit=450%2C614&ssl=1"},
    {name:"Swing DDT",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/5-Swing-DDT.jpg?fit=450%2C614&ssl=1"},
    {name:"Throw Into the Corner",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Throw-into-the-Corner.jpg?fit=450%2C614&ssl=1"},
    {name:"Throw Into the Post",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/5-Throw-Into-the-Post.jpg?fit=450%2C614&ssl=1"},
    {name:"Walking Rib Breaker",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/5-Walking-Rib-Breaker.jpg?fit=450%2C614&ssl=1"},
    {name:"Whirlwind Whip",number:5,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/5-Whirlwind-Whip.jpg?fit=450%2C614&ssl=1"},
    // #6
    // {name:"",number:6,competitor:"",entrance:"",image:""},
    {name:"A Welcomed Distraction",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/06-AWelcomedDistraction.png?fit=1502%2C2048&ssl=1"},
    {name:"Ankle Trap",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Ankle-Trap.jpg?fit=450%2C614&ssl=1"},
    {name:"Arm and Shoulder Stretch",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/06-Arm-and-Shoulder-Stretch.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Arm Tangle",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Arm-Tangle.jpg?fit=450%2C614&ssl=1"},
    {name:"Arm Wrench",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/06-Arm-Wrench.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Armbar",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Armbar.jpg?fit=450%2C614&ssl=1"},
    {name:"Armlock Over the Apron",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/06-Armlock-over-the-Apron.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Blink",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/6-Blink.jpg?fit=450%2C614&ssl=1"},
    {name:"Big Body Block",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/6-Big-Body-Block.jpg?fit=450%2C614&ssl=1"},
    {name:"Cat's Claws",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/6-Cats-Claws.jpg?fit=450%2C614&ssl=1"},
    {name:"Cat's Claws V2",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"Charge That Puppy Up!",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/6-Charge-That-Puppy-Up.jpg?fit=450%2C614&ssl=1"},
    {name:"Charge That Puppy Up!",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/6-Charge-That-Puppy-Up-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Chicken Wing Choke",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Chicken-Wing-Choke.jpg?fit=450%2C614&ssl=1"},
    {name:"Cosmic Arm Trap",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/6-Cosmic-Arm-Trap.jpg?fit=450%2C614&ssl=1"},
    {name:"Cosmic Trap",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/06-CosmicTrap.png?fit=1502%2C2048&ssl=1"},
    {name:"Derailed",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Derailed.jpg?fit=450%2C614&ssl=1"},
    {name:"Drag to the Center",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Drag-to-the-Center.jpg?fit=450%2C614&ssl=1"},
    {name:"Elevated Arm Bar",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Elevated-Arm-Bar.jpg?fit=450%2C614&ssl=1"},
    {name:"Elevated Sleeper Hold",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/6-Elevated-Sleeper-Hold.jpg?fit=450%2C614&ssl=1"},
    {name:"Expose the Opponent",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/06-ExposeTheOpponent.png?fit=1502%2C2048&ssl=1"},
    {name:"Finger Crush",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/6-Finger-Crush.jpg?fit=450%2C614&ssl=1"},
    {name:"Fujiwara Armbar",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/6-Fujiwara-Armbar.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Microphone",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/6-Going-Over-the-Microphone.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Ring Steps",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Going-Over-the-Ring-Steps.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Sledgehammer",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/02/6-Going-Over-the-Sledgehammer.jpg?fit=450%2C614&ssl=1"},
    {name:"Going Over the Steel Chain",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Going-Over-the-Steel-Chain.jpg?fit=450%2C614&ssl=1"},
    {name:"Grab Hold",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Grab-Hold.jpg?fit=450%2C614&ssl=1"},
    {name:"Irish Goodbye",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/6-Irish-Goodbye.jpg?fit=450%2C614&ssl=1"},
    {name:"Jaw Wrench",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Jaw-Wrench.jpg?fit=450%2C614&ssl=1"},
    {name:"Kicker Choke",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/6-Kicker-Choke.jpg?fit=450%2C614&ssl=1"},
    {name:"Knead the Dough",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/6-Knead-the-Dough.jpg?fit=450%2C614&ssl=1"},
    {name:"Knee Bar",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/6-Knee-Bar.jpg?fit=450%2C614&ssl=1"},
    {name:"Philly Cheese Grater",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/6-Philly-Cheese-Grater-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Pretzel Twist",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Pretzel-Twist.jpg?fit=450%2C614&ssl=1"},
    {name:"Scissor Me Handsome Pineapple",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/6-Scissor-Me-Handsome-Pineapple.jpg?fit=450%2C614&ssl=1"},
    {name:"Shoulder Buster",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/6-Shoulder-Buster.jpg?fit=450%2C614&ssl=1"},
    {name:"Sky Dive",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/6-Sky-Dive.jpg?fit=450%2C614&ssl=1"},
    {name:"Sleeper Bomb",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/06-SleeperBomb.png?fit=1502%2C2048&ssl=1"},
    {name:"Snap Grab",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Snap-Grab.jpg?fit=450%2C614&ssl=1"},
    {name:"Sword Draw",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/6-Sword-Draw.jpg?fit=450%2C614&ssl=1"},
    {name:"The Boss Drops Off the Fire'Panadas",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/6-The-Boss-Drops-Off-the-FirePanadas-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Tug of War",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/6-Tug-of-War.jpg?fit=450%2C614&ssl=1"},
    {name:"Work Over",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Work-Over.jpg?fit=450%2C614&ssl=1"},
    {name:"Working the Arm",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/6-Working-the-Arm.jpg?fit=450%2C614&ssl=1"},
    {name:"Wrap Around Wrist Lock",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/6-Wrap-Around-Wrist-Lock.jpg?fit=450%2C614&ssl=1"},
    {name:"Young Dumb, Young Dumb, Young Dumb, and Broke!",number:6,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/06/6-Young-Dumb-Young-Dumb-Young-Dumb-and-Broke.jpg?fit=450%2C614&ssl=1"},
    // #7
    // {name:"",number:7,competitor:"",entrance:"",image:""},
    {name:"Back Elbow",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Back-Elbow.jpg?fit=450%2C614&ssl=1"},
    {name:"Back Smash",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Back-Smash.jpg?fit=450%2C614&ssl=1"},
    {name:"Barrel Burner",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/7-Barrel-Burner.jpg?fit=450%2C614&ssl=1"},
    {name:"Baseball Slide",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/7-Baseball-Slide-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Blinding Potion No. 7",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/7-Blinding-Potion-No.7.jpg?fit=450%2C614&ssl=1"},
    {name:"Boss-Rate Chop",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Boss-Rate-Chop.jpg?fit=450%2C614&ssl=1"},
    {name:"Calling for Backup",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"Cat Uprising",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/7-Cat-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Charging Elbow",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/7-Charging-Elbow.jpg?fit=450%2C614&ssl=1"},
    {name:"Chest Slap",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Chest-Slap.jpg?fit=450%2C614&ssl=1"},
    {name:"Choppa-Choppa, Choppa-Choppa, Choppa-Choppa, Chop!",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/7-Choppa-Choppa-Choppa-Choppa-Choppa-Choppa-Chop.jpg?fit=450%2C614&ssl=1"},
    {name:"Discus Punch",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Discus-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Doomsday Lariat",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Doomsday-Lariat.jpg?fit=450%2C614&ssl=1"},
    {name:"Dragon Punch",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Dragon-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Drawin' Dimes",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Drawin-Dimes.jpg?fit=450%2C614&ssl=1"},
    {name:"Drawin' Dimes",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/7-Drawin-Dimes-Strike.jpg?fit=450%2C614&ssl=1"},
    {name:"Drumstick Uprising",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-DrumstickUprising.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Elbow Drop",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Elbow-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Elbow Shot",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-elbowshot.jpeg?fit=1502%2C2048&ssl=1"},
    {name:"Elbow Smash",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Elbow-Smash.jpg?fit=450%2C614&ssl=1"},
    {name:"Exposed Turnbuckle",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/07-ExposedTurnbuckle.png?fit=1502%2C2048&ssl=1"},
    {name:"Face-Off",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/7-Face-Off.jpg?fit=450%2C614&ssl=1"},
    {name:"Forearm Shot",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Forearm-Shot.jpg?fit=450%2C614&ssl=1"},
    {name:"I Came In Like a Wrecking Ball",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/7-I-Came-In-Like-a-Wrecking-Ball.jpg?fit=450%2C614&ssl=1"},
    {name:"Jump Kick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Jump-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Jumping Stomp",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-Jumping-Stomp.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Kabuki",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/7-Kabuki.jpg?fit=450%2C614&ssl=1"},
    {name:"Kendo Stick Uprising",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Kendo-Stick-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Knife Edge Chop",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Knife-Edge-Chop.jpg?fit=450%2C614&ssl=1"},
    {name:"Ladder Uprising",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Ladder-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Long Boat Leap",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-LongBoatLeap.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Low Blow with the Chain",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-LowBlowWithTheChain.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Making An Impact",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Making-an-Impact.jpg?fit=450%2C614&ssl=1"},
    {name:"Muay Thai Knee",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/07-MuayThaiKnee.png?fit=1502%2C2048&ssl=1"},
    {name:"Off the Ropes",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/7-Off-the-Ropes.jpg?fit=450%2C614&ssl=1"},
    {name:"Overrun",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Overrun.jpg?fit=450%2C614&ssl=1"},
    {name:"Pineapple Uprising",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/7-Pineapple-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Posing With the Crowd",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-Posing-with-the-Crowd.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Potion Uprising",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-PotionUprising.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Pulverizing Pinball",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/7-Pulverizing-Pinball.jpg?fit=450%2C614&ssl=1"},
    {name:"Rainbow Punch",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Rainbow-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Razor Whip",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/7-Razor-Whip.jpg?fit=450%2C614&ssl=1"},
    {name:"Ride the Wave",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Ride-the-Wave.jpg?fit=450%2C614&ssl=1"},
    {name:"Rolling Forearm",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Rolling-Forearm.jpg?fit=450%2C614&ssl=1"},
    {name:"Rolling Forearm",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Rolling-Forearm-Technique.jpg?fit=450%2C614&ssl=1"},
    {name:"Run It Back",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Run-It-Back.jpg?fit=450%2C614&ssl=1"},
    {name:"Rainbow Kick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/7-Rainbow-Kick-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Scissor Kick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/7-Scissor-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Skull Punch",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/7-Skull-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Slithering Shot",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/7-Slithering-Shot-V2-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Springboard Leg Drop",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/7-Springboard-Leg-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Standing Dropkick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Standing-Dropkick.jpg?fit=450%2C614&ssl=1"},
    {name:"Stomp",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Stomp.jpg?fit=450%2C614&ssl=1"},
    {name:"Stomp in the Ropes",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/07-Stomp-in-the-Ropes.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Super Side Kick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/7-Super-Side-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Surprise Hit",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Surprise-Hit.jpg?fit=450%2C614&ssl=1"},
    {name:"Surprise Hit",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/07-SurpriseHit.png?fit=1502%2C2048&ssl=1"},
    {name:"Taunting Kick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Taunting-Kick.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunting Kick",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/7-Taunting-Kick-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"This is Gonna Leave a Mark",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/08-ThisIsGunnaLeaveAmarknologo.png?fit=1502%2C2048&ssl=1"},
    {name:"Thunderous Slap",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/07-ThunderousSlap.png?fit=1502%2C2048&ssl=1"},
    {name:"Thunderous Stomp",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/7-Thunderous-Stomp.jpg?fit=450%2C614&ssl=1"},
    {name:"Too Sheep!",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Too-Sheep.jpg?fit=450%2C614&ssl=1"},
    {name:"Took It On the Chin!",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/7-Took-It-On-the-Chin.jpg?fit=450%2C614&ssl=1"},
    {name:"Tornillo",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/7-Tornillo.jpg?fit=450%2C614&ssl=1"},
    {name:"Unacceptable Impact",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/07-UnacceptableImpact.png?fit=1502%2C2048&ssl=1"},
    {name:"Wrench Trip",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/7-Wrench-Trip.jpg?fit=450%2C614&ssl=1"},
    {name:"You've Been Naughty",number:7,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/7-Youve-Been-Naughty.jpg?fit=450%2C614&ssl=1"},
    // #8
    // {name:"",number:8,competitor:"",entrance:"",image:""},
    {name:"A Head of Steam",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/8-A-Head-of-Steam.jpg?fit=450%2C614&ssl=1"},
    {name:"Air Raid Crash",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/8-Air-Raid-Crash.jpg?fit=450%2C614&ssl=1"},
    {name:"Airplane Spin",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/8-Airplane-Spin.jpg?fit=450%2C614&ssl=1"},
    {name:"Armbar Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Armbar-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Belly to Belly Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Belly-to-Belly-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Big Belly Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/8-Big-Belly-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Big Dimes Potion",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/09/big-dimes-potion.png?fit=1170%2C1581&ssl=1"},
    {name:"Body Slam",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Body-Slam.jpg?fit=450%2C614&ssl=1"},
    {name:"Bulldog",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Bulldog.jpg?fit=450%2C614&ssl=1"},
    {name:"Call to the Crowd",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/01/8-Call-to-the-Crowd-Alt.jpg?fit=450%2C614&ssl=1"},
    {name:"Call to the Crowd",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Call-to-the-Crowd-Agility.jpg?fit=450%2C614&ssl=1"},
    {name:"Check Under The Ring",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/08-CheckUnderTheRing.png?fit=1502%2C2048&ssl=1"},
    {name:"Choking with the Chain",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/08-Choking-with-the-Chain.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Crowd's Got My Back",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/08-Crowds-Got-My-Back.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Diversion Drop",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Diversion-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Dog Uprising",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/8-Dog-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Double Leg Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Double-Leg-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Dragon Drop",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Dragon-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Face Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Face-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Fireman's Carry",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Firemans-Carry.jpg?fit=450%2C614&ssl=1"},
    {name:"Flip the Bird",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/08-FlipTheBird.png?fit=1502%2C2048&ssl=1"},
    {name:"Flying Slam",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/08-FlyingSlam.png?fit=1502%2C2048&ssl=1"},
    {name:"German Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/8-German-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Greco Roman Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Greco-Roman-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Guitar Uprising",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/05/8-Guitar-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Gut Buster",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Gut-Buster.jpg?fit=450%2C614&ssl=1"},
    {name:"Half-and-Half Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/8-Half-and-Half-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Jumping Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/08-Jumping-Suplex.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Kabloow",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/8-Kabloow.jpg?fit=450%2C614&ssl=1"},
    {name:"King's Welcome",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Kings-Welcome.jpg?fit=450%2C614&ssl=1"},
    {name:"Lucha, Rinse, Repeat!",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/8-Lucha-Rinse-Repeat.jpg?fit=450%2C614&ssl=1"},
    {name:"Making Waves",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/8-Making-Waves.jpg?fit=450%2C614&ssl=1"},
    {name:"Marvelous Recruits",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Marvelous-Recruits.jpg?fit=450%2C614&ssl=1"},
    {name:"Money to Burn",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/8-Money-to-Burn.jpg?fit=450%2C614&ssl=1"},
    {name:"Northern Lights Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/8-Northern-Lights-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Once More, With Feeling",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/08-OnceMoreWithFeeling.png?fit=1502%2C2048&ssl=1"},
    {name:"One More Time",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-One-More-Time.jpg?fit=450%2C614&ssl=1"},
    {name:"Pump Up the Crowd",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Pump-Up-the-Crowd.jpg?fit=450%2C614&ssl=1"},
    {name:"Pump Up the Crowd",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/08-PumpUpTheCrowd.png?fit=1502%2C2048&ssl=1"},
    {name:"Restoration Potion #8",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Restoration-Potion-8.jpg?fit=450%2C614&ssl=1"},
    {name:"Reverse Scoop Slam",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/08-reversescoopslam.jpeg?fit=1502%2C2048&ssl=1"},
    {name:"Scoop Slam",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Scoop-Slam.jpg?fit=450%2C614&ssl=1"},
    {name:"Seal Uprising",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/06/8-Seal-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Slam Off the Ring",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Slam-Off-the-Ring.jpg?fit=450%2C614&ssl=1"},
    {name:"Slash",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/8-Slash.jpg?fit=450%2C614&ssl=1"},
    {name:"Snap Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Snap-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel Chair Uprising",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Steel-Chair-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Stunning Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/8-Stunning-Suplex.jpg?fit=450%2C614&ssl=1"},
    {name:"Sunset Spin",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/8-Sunset-Spin-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Surfboard Buster",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/8-Surfboard-Buster.jpg?fit=450%2C614&ssl=1"},
    {name:"Sweet & Salty Impact Drop",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Sweet-Salty-Impact-Drop.jpg?fit=450%2C614&ssl=1"},
    {name:"Sweet & Salty Impact Drop",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/8-Sweet-Salty-Impact-Drop-Grapple.jpg?fit=450%2C614&ssl=1"},
    {name:"Sweet & Salty Impact Drop",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"Swing Around the Ring",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"Swinging Neckbreaker",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/8-Swinging-Neckbreaker-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Table Uprising",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Table-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunt",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Taunt.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunting Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Taunting-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunting Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/8-Taunting-Takedown-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Thunderous Goozle",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/8-Thunderous-Goozle.jpg?fit=450%2C614&ssl=1"},
    {name:"Tiger Suplex",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/08-Tiger-Suplex.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Tornado Chin Takedown",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Tornado-Chin-Takedown.jpg?fit=450%2C614&ssl=1"},
    {name:"Toss Out of the Ring",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/8-Toss-Out-of-the-Ring.jpg?fit=450%2C614&ssl=1"},
    {name:"Trash Can Uprising",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/8-Trash-Can-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Turbo Top Spin",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/8-Turbo-Top-Spin.jpg?fit=450%2C614&ssl=1"},
    {name:"Work the Crowd",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/8-Work-the-Crowd.jpg?fit=450%2C614&ssl=1"},
    {name:"What Will Break First?",number:8,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/8-What-Will-Break-First.jpg?fit=450%2C614&ssl=1"},
    // #9
    // {name:"",number:9,competitor:"",entrance:"",image:""},
    {name:"A Puncher's Chance",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/09-APunchersChance.png?fit=1502%2C2048&ssl=1"},
    {name:"All American Hold",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-All-American-Hold.jpg?fit=450%2C614&ssl=1"},
    {name:"An Iconic Performance",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-An-Iconic-Performance.jpg?fit=450%2C614&ssl=1"},
    {name:"Apply Pressure",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Apply-Pressure.jpg?fit=450%2C614&ssl=1"},
    {name:"Arm Buster",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Arm-Buster.jpg?fit=450%2C614&ssl=1"},
    {name:"Arm Wringer",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Arm-Wringer.jpg?fit=450%2C614&ssl=1"},
    {name:"Armoured Aggression",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-ArmouredAggressionnologo.png?fit=1502%2C2048&ssl=1"},
    {name:"Atomic Chicken Wing",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Atomic-Chicken-Wing.jpg?fit=450%2C614&ssl=1"},
    {name:"Brainwashed",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/9-Brainwashed.jpg?fit=450%2C614&ssl=1"},
    {name:"Cauldron Boil",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/11/9-Cauldron-Boil.jpg?fit=450%2C614&ssl=1"},
    {name:"Chicken Wing Cutter",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/9-Chicken-Wing-Cutter.jpg?fit=450%2C614&ssl=1"},
    {name:"Chin Wrenching",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-Chin-Wrenching.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Chugga-Chugga Chugga-Chugga Chugga-Chugga, Chug!",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-%E2%80%93-Chugga-Chugga-Chugga-Chugga-Chugga-Chugga-Chug.jpg?fit=450%2C614&ssl=1"},
    {name:"Chugga-Chugga Chugga-Chugga Chugga-Chugga, Chug!",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-ChuggaChugga-FullArt.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Chugga-Chugga Chugga-Chugga Chugga-Chugga, Chug!",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/9-Chugga-Chugga-Chugga-Chugga-Chugga-Chugga-Chug-Submission.jpg?fit=450%2C614&ssl=1"},
    {name:"Cosmic Clutch",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/9-Cosmic-Clutch-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Desperate Times",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/08/9-Desperate-Times.jpg?fit=450%2C614&ssl=1"},
    {name:"Duck the Clothesline",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Duck-the-Clothesline.jpg?fit=450%2C614&ssl=1"},
    {name:"Epic Stare Down",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Epic-Stare-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Escape Potion #9",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/9-Escape-Potion-9-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Embossed Steel Surfboard",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/05/9-Embossed-Steel-Surfboard.jpg?fit=450%2C614&ssl=1"},
    {name:"Eye Rake",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Eye-Rake.jpg?fit=450%2C614&ssl=1"},
    {name:"Face Lift",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Face-Lift.jpg?fit=450%2C614&ssl=1"},
    {name:"Face Stretch",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Face-Stretch.jpg?fit=450%2C614&ssl=1"},
    {name:"Face Wash",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/9-Face-Wash.jpg?fit=450%2C614&ssl=1"},
    {name:"Feeding Off the Crowd",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/9-Feeding-Off-the-Crowd.jpg?fit=450%2C614&ssl=1"},
    {name:"Front Chancery",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Front-Chancery.jpg?fit=450%2C614&ssl=1"},
    {name:"Fuhgeddaboutit!",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Fuhgeddaboutit.jpg?fit=450%2C614&ssl=1"},
    {name:"Funtime Hold",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/09-FuntimeHold.png?fit=1502%2C2048&ssl=1"},
    {name:"Gory Special",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/9-Gory-Special.jpg?fit=450%2C614&ssl=1"},
    {name:"Head Crush",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Head-Crush.jpg?fit=450%2C614&ssl=1"},
    {name:"Head Crush",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"Head Scratch",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-headscatch.jpeg?fit=1502%2C2048&ssl=1"},
    {name:"Headlock Punch",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/9-Headlock-Punch.jpg?fit=450%2C614&ssl=1"},
    {name:"Heat from the Crowd",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"Hoagie Sandwhich",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/8-Hoagie-Sandwich.jpg?fit=450%2C614&ssl=1"},
    {name:"Hype the Crowd",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Hype-the-Crowd.jpg?fit=450%2C614&ssl=1"},
    {name:"Land on Generic Building Blocks",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/09-LandOnGenericBuildingBlocks.png?fit=1502%2C2048&ssl=1"},
    {name:"Listen Up, Jack!",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Listen-Up-Jack.jpg?fit=450%2C614&ssl=1"},
    {name:"Microphone Uprising",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/08/9-Microphone-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Norwegian Scapegoat Slam",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/9-Norwegian-Scapegoat-Slam-1.jpg?fit=450%2C614&ssl=1"},
    {name:"Pendulum Swing",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2023/03/9-Pendulum-Swing.jpg?fit=450%2C614&ssl=1"},
    {name:"Restoration Hand Shake",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-restorationhandshake.jpeg?fit=1502%2C2048&ssl=1"},
    {name:"Ricotta",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/02/9-Ricotta.jpg?fit=450%2C614&ssl=1"},
    {name:"Ring Step Uprising",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Ring-Step-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Rolling Headlock",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Rolling-Headlock.jpg?fit=450%2C614&ssl=1"},
    {name:"Second Wind",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Second-Wind.jpg?fit=450%2C614&ssl=1"},
    {name:"Second Wind",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/09-SecondWind.png?fit=1502%2C2048&ssl=1"},
    {name:"Sheep Uprising",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/09/9-Sheep-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Sledgehammer Uprising",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/06/9-Sledgehammer-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Spit Fire Chariot",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/08/9-Spit-Fire-Chariot.jpg?fit=450%2C614&ssl=1"},
    {name:"Split Finger Gouge",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Split-Finger-Gouge.jpg?fit=450%2C614&ssl=1"},
    {name:"Split Finger Lock",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Split-Finger-Lock.jpg?fit=450%2C614&ssl=1"},
    {name:"Stare Down",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/9-Stare-Down.jpg?fit=450%2C614&ssl=1"},
    {name:"Steel Chain Uprising",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Steel-Chain-Uprising.jpg?fit=450%2C614&ssl=1"},
    {name:"Strength in Numbers",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Strength-in-Numbers.jpg?fit=450%2C614&ssl=1"},
    {name:"Strength in Numbers",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Strength-in-Numbers-Power.jpg?fit=450%2C614&ssl=1"},
    {name:"Stretch Plum",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-Stetch-Plum.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Submerge",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/08/9-Submerge.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunting Choke Hold",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Taunting-Choke-Hold.jpg?fit=450%2C614&ssl=1"},
    {name:"Taunting Choke Hold",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/04/9-Taunting-Choke-Hold-V2.jpg?fit=450%2C614&ssl=1"},
    {name:"Took It On the Chin!",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Took-It-On-the-Chin.jpg?fit=450%2C614&ssl=1"},
    {name:"Twisting Wrist Burn",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/06/09-TwistingWristBurn.png?fit=1502%2C2048&ssl=1"},
    {name:"Two-Handed Choke",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2021/10/9-Two-Handed-Choke.jpg?fit=450%2C614&ssl=1"},
    {name:"Vice Grip",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2024/01/09-Vice-Grip.jpg?fit=1502%2C2048&ssl=1"},
    {name:"Wrist Lock",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/10/9-Wrist-Lock.jpg?fit=450%2C614&ssl=1"},
    {name:"Wrist Lock",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2020/12/No-Picture-Available-1.png?fit=450%2C614&ssl=1"},
    {name:"You've Been Naughty",number:9,competitor:"",entrance:"",image:"https://i0.wp.com/www.srgpc.net/wp-content/uploads/2022/12/9-Youve-Been-Naughty.jpg?fit=450%2C614&ssl=1"},
  ];
 
  // Save collection and decks to localStorage
  function saveData() {
    localStorage.setItem("collection", JSON.stringify(collection));
    localStorage.setItem("decks", JSON.stringify(decks));
  }

  // Load collection and decks from localStorage
  function loadData() {
    collection = JSON.parse(localStorage.getItem("collection")) || [];
    decks = JSON.parse(localStorage.getItem("decks")) || [];
  }

  // Call loadData() on startup
  loadData();
  displayCollection();
  displayDecks();

  // Navigation: show one page at a time.
  function showPage(target) {
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  }
  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("data-tab");
      showPage(target);
    });
  });

  // Home page functions
  scanCardButton.addEventListener("click", () => {
    alert("Scanning feature not implemented yet.");
  });
  manualInputButton.addEventListener("click", () => {
    const cardName = prompt("Enter card name:");
    const cardNumber = prompt("Enter card number (or leave blank if not applicable):");
    const cardCompetitor = prompt("Enter competitor (or leave blank if not applicable):") || "";
    const cardEntrance = prompt("Enter entrance (or leave blank if not applicable):") || "";
    const cardImage = prompt("Enter image URL (or leave blank for default):") || "placeholder.jpg";
    
    // You can decide what fields are required based on your data model.
    if (cardName && (cardNumber || cardCompetitor || cardEntrance)) {
      const card = {
        name: cardName,
        // Convert cardNumber to a number if provided; otherwise, keep it null.
        number: cardNumber ? parseInt(cardNumber) : null,
        competitor: cardCompetitor,
        entrance: cardEntrance,
        image: cardImage
      };
      collection.push(card);
      displayCollection();
      saveData();
    } else {
      alert("Invalid input. Please enter a valid card name and at least one category value.");
    }
  });

  // Toggle Remove Mode on Collection page
  toggleRemoveButton.addEventListener("click", () => {
    removeMode = !removeMode;
    toggleRemoveButton.textContent = removeMode ? "Disable Remove Mode" : "Enable Remove Mode";
    displayCollection();
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";
    const filteredCards = cardDatabase.filter(card =>
      card.name.toLowerCase().includes(query)
    );
    filteredCards.forEach(card => {
      const cardEl = createCardElement(card, "search");
      searchResults.appendChild(cardEl);
    });
  });
  // Event listener for collection search (by card name)
  collectionSearch.addEventListener("input", displayCollection);

  // Display collection with sorting
  function displayCollection() {
    collectionGrid.innerHTML = "";
    let filtered = collection.slice();
    
    const selectedNumber = sortNumber.value;
    const competitorText = sortCompetitor.value.toLowerCase().trim();
    const entranceText = sortEntrance.value.toLowerCase().trim();
    const nameText = collectionSearch.value.toLowerCase().trim();
    if (selectedNumber !== "all") {
      filtered = filtered.filter(card => card.number == selectedNumber);
    }
    if (competitorText !== "") {
      filtered = filtered.filter(card =>
        card.competitor.toLowerCase().includes(competitorText)
      );
    }
    if (entranceText !== "") {
      filtered = filtered.filter(card =>
        card.entrance.toLowerCase().includes(entranceText)
      );
    }
    if (nameText !== "") {
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(nameText)
      );
    }
    filtered.forEach(card => {
      const cardEl = createCardElement(card, "collection");
      collectionGrid.appendChild(cardEl);
    });
  }

  // Create card element for "search" and "collection" contexts.
  function createCardElement(card, context) {
    const el = document.createElement("div");
    el.classList.add("card");
    el.innerHTML = `
      <img src="${card.image}" alt="${card.name}" class="card-image">
      <strong>${card.name}</strong>
    `;
    if (context === "search") {
      const btn = document.createElement("button");
      btn.textContent = "Add to Collection";
      btn.addEventListener("click", () => {
        collection.push(card);
        displayCollection();
        saveData();
      });
      el.appendChild(btn);
    } else if (context === "collection") {
      if (removeMode) {
        const btn = document.createElement("button");
        btn.textContent = "Remove from Collection";
        btn.addEventListener("click", () => {
          const idx = collection.findIndex(c => c === card);
          if (idx > -1) {
            collection.splice(idx, 1);
            displayCollection();
            saveData();
          }
        });
        el.appendChild(btn);
      } else {
        const btn = document.createElement("button");
        btn.textContent = "Add to Deck";
        btn.addEventListener("click", () => {
          addToDeck(card);
        });
        el.appendChild(btn);
      }
    }
    return el;
  }

  // Function to add a card to a deck (from collection or search)
  function addToDeck(card) {
    if (decks.length === 0) {
      alert("No decks available. Create one first.");
      return;
    }
    const deckName = prompt("Enter the deck name to add this card:");
    if (!deckName) return;
    const deck = decks.find(d => d.name.toLowerCase() === deckName.toLowerCase());
    if (deck) {
      deck.cards.push(card);
      displayDecks();
      saveData();
    } else {
      alert("Deck not found.");
    }
  }

  // Function to remove a card from a deck
  function removeCardFromDeck(deck, cardIndex) {
    deck.cards.splice(cardIndex, 1);
    displayDecks();
    saveData();
  }

  // Function to add a card from the collection to a specific deck (from deck page)
  function addCardToDeck(deck) {
    const cardName = prompt("Enter the name of the card from your collection to add to this deck:");
    if (!cardName) return;
    const card = collection.find(c => c.name.toLowerCase() === cardName.toLowerCase());
    if (card) {
      deck.cards.push(card);
      displayDecks();
      saveData();
    } else {
      alert("Card not found in your collection.");
    }
  }

  // Deck functionality: Create a new deck.
  createDeckButton.addEventListener("click", () => {
    const deckName = prompt("Enter deck name:");
    if (deckName) {
      decks.push({ name: deckName, cards: [], loaded: false });
      displayDecks();
      saveData();
    }
  });

  // Display decks with Load/Hide toggle, Remove Deck, and card removal within deck.
  function displayDecks() {
    deckList.innerHTML = "";
    decks.forEach((deck, deckIndex) => {
      const deckEl = document.createElement("div");
      deckEl.classList.add("deck");
      
      // Deck header with deck name, toggle button, and remove deck button.
      const header = document.createElement("div");
      header.innerHTML = `<strong>${deck.name}</strong>`;
      
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = deck.loaded ? "Hide Deck" : "Load Deck";
      toggleBtn.addEventListener("click", () => {
        deck.loaded = !deck.loaded;
        displayDecks();
      });
      header.appendChild(toggleBtn);
      
      const removeDeckBtn = document.createElement("button");
      removeDeckBtn.textContent = "Remove Deck";
      removeDeckBtn.addEventListener("click", () => {
        decks.splice(deckIndex, 1);
        displayDecks();
        saveData();
      });
      header.appendChild(removeDeckBtn);
      
      deckEl.appendChild(header);
      
      // If deck is loaded, show its cards and an "Add Card from Collection" button.
      if (deck.loaded) {
        const addCardBtn = document.createElement("button");
        addCardBtn.textContent = "Add Card from Collection";
        addCardBtn.addEventListener("click", () => addCardToDeck(deck));
        deckEl.appendChild(addCardBtn);
        
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("deck-cards", "grid-container");
        
        deck.cards.forEach((card, cardIndex) => {
          const cardEl = document.createElement("div");
          cardEl.classList.add("card");
          cardEl.innerHTML = `
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <strong>${card.name}</strong>
          `;
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remove from Deck";
          removeBtn.addEventListener("click", () => {
            removeCardFromDeck(deck, cardIndex);
          });
          cardEl.appendChild(removeBtn);
          cardsContainer.appendChild(cardEl);
        });
        deckEl.appendChild(cardsContainer);
      }
      
      deckList.appendChild(deckEl);
    });
  }

  // Sorting event listeners for Collection page
  sortNumber.addEventListener("change", displayCollection);
  sortCompetitor.addEventListener("input", displayCollection);
  sortEntrance.addEventListener("input", displayCollection);
});
