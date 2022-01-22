function ImagesPreloader() {
  (this.loadedImages = {}),
    (this.data = null),
    (this.endCallback = null),
    (this.processCallback = null),
    (this.minProgressVal = 0),
    (this.maxProgressVal = 100),
    (this.wait = Utils.proxy(this.wait, this));
}

function SoundsPreloader(e, t, s) {
  (this.sounds = e),
    (this.endCallback = t),
    (this.progressCallback = s),
    (this.loadedCount = 0),
    (this.minProgressVal = 0),
    (this.maxProgressVal = 100);
}
function Asset(e, t, s, i, a, r) {
  (this.name = e + ""),
    (this.src = t + ""),
    (this.width = s),
    (this.height = i),
    (this.frames = a),
    (this.layers = r),
    (this.bitmap = null),
    (this.object = null),
    (this.ready = !(!this.width || !this.height)),
    (this.spriteClass = null);
}
function AssetsLibrary(e, t, s) {
  (this.path = "images"),
    (this.scale = 1),
    (this.items = {}),
    (this.bitmaps = {}),
    (this.loaded = !1),
    (this.onload = null),
    (this.onloadprogress = null),
    (this.spriteClass = Sprite),
    (this.onLoadHandler = Utils.proxy(this.onLoadHandler, this)),
    (this.onLoadProgressHandler = Utils.proxy(
      this.onLoadProgressHandler,
      this
    )),
    this.init(e, t),
    this.addAssets(s);
}
function Vector(e, t) {
  "undefined" == typeof e && (e = 0),
    (this.x = e),
    "undefined" == typeof t && (t = 0),
    (this.y = t);
}
function Rectangle(e, t, s, i, a) {
  (this.center = new Vector(e, t)),
    (this.width = s),
    (this.height = i),
    (this.angle = a),
    (this.vertices = []),
    (this.AABB = []),
    this.refreshVertices();
}
function EventsProxy() {
  this.eventsListeners = [];
}
function Tween(e, t, s, i, a, r) {
  if (
    (Utils.callSuperConstructor(Tween, this),
    "object" != typeof e && (e = null),
    e)
  ) {
    if ("undefined" == typeof e[t])
      throw new Error('Trying to tween undefined property "' + t + '"');
    if (isNaN(e[t])) throw new Error("Tweened value can not be " + typeof e[t]);
  } else if (isNaN(t)) throw new Error("Tweened value can not be " + typeof t);
  "function" != typeof r && (r = Easing.linear.easeIn),
    (this.obj = e),
    (this.prop = t),
    (this.start = s),
    (this.end = i),
    (this.duration = ~~a),
    (this.callback = r),
    (this.playing = !1),
    (this._pos = -1),
    (this.autoRewind = !1),
    (this.newly = !0),
    (this.eventsListeners = []);
}
function DisplayObjectContainer() {
  Utils.callSuperConstructor(DisplayObjectContainer, this),
    (this.objects = []),
    (this.anchor = { x: 0, y: 0 });
}
function DisplayObject() {
  Utils.callSuperConstructor(DisplayObject, this);
}
function Graphics() {
  Utils.callSuperConstructor(Graphics, this);
}
function Sprite(e, t, s, i, a) {
  Utils.callSuperConstructor(Sprite, this),
    (this.offset = { left: 0, top: 0 }),
    (this.width = t),
    (this.height = s),
    (this.totalFrames = Math.max(1, ~~i)),
    this.totalFrames <= 1 && (this.animated = !1),
    (this.totalLayers = Math.max(1, ~~a)),
    (this.bitmap = e),
    (this.changeFrameDelay = Sprite.CHANGE_FRAME_DELAY),
    (this.cacheBitmap = Sprite.CACHE_BITMAPS);
}
function TransformFilter(e) {
  if ("function" != typeof e) throw new Error("Invalid filter");
  (this.filter = e), (this.sprite = null);
}
function StageTimer(e, t, s) {
  Utils.callSuperConstructor(StageTimer, this),
    (this.repeat = s),
    (this.initialTimeout = t),
    (this.timeout = t),
    (this.onend = e),
    (this.destroy = !1),
    (this.newly = !0),
    (this.paused = !1);
}
function Stage(e, t, s) {
  Utils.callSuperConstructor(Stage, this),
    (this.canvas = null),
    e && (this.canvas = "string" == typeof e ? document.getElementById(e) : e),
    (this.backgroundCanvas = null),
    (this.needToRebuildBack = !1),
    (this.screenWidth = t),
    (this.screenHeight = s),
    (this.viewport = { x: 0, y: 0 }),
    (this.buffer = null),
    (this.buffer = document.createElement("canvas")),
    (this.buffer.width = t * Utils.globalScale),
    (this.buffer.height = s * Utils.globalScale),
    (this.transformBuffer = null),
    (this.transformBuffer = document.createElement("canvas")),
    (this.transformBuffer.width = t * Utils.globalScale),
    (this.transformBuffer.height = s * Utils.globalScale),
    (this.delay = 40),
    (this.started = !1),
    (this.fps = 0),
    (this.lastFPS = 0),
    (this.showFPS = !1),
    (this.pixelClickEvent = !1),
    (this.pixelMouseUpEvent = !1),
    (this.pixelMouseDownEvent = !1),
    (this.pixelMouseMoveEvent = !1),
    (this.ceilSizes = !1),
    (this.tmMain = null),
    (this.tmFPS = null),
    (this.clearLock = !1),
    (this.allowDebugDrawing = !1),
    (this.allowStaticDebugDrawing = !1),
    (this.drawBackAlways =
      Utils.mobileCheckBrokenAndroid() ||
      (!Utils.detectMobileBrowser() && Utils.isChrome())),
    (this.tweens = []),
    (this.timers = []),
    (this.eventsListeners = []),
    (this.lastTick = 0),
    (this.inputController = null),
    (this.inputListeners = null),
    (this.onpretick = null),
    (this.onprerender = null),
    (this.onposttick = null),
    (this.onmousedown = null),
    (this.onmouseup = null),
    (this.onclick = null),
    (this.oncontextmenu = null),
    (this.onmousemove = null),
    this.canvas && this.addInputListeners(this.canvas),
    (this.tick = Utils.proxy(this.tick, this)),
    (this.clearFPS = Utils.proxy(this.clearFPS, this)),
    (this.stage = this),
    (this.drawScene = this.render);
}
function AudioPlayer() {
  (this.volume = 1),
    (this.disabled = !1),
    (this.basePath = ""),
    (this.mp3Support = !0),
    (this.delayPlay = !1),
    (this.audioWrapper = null),
    (this.locked = !1),
    (this.busy = !1),
    (this.startPlayTime = 0),
    (this.onend = null),
    (this.controlPlay = Utils.proxy(this.controlPlay, this));
}
function AudioMixer(e, t) {
  (this.singleChannelMode = !1), (this.channels = []), this.init(e, t);
}
function TilesSprite(e, t, s, i, a, r) {
  TilesSprite.superclass.constructor.call(this, e, t, s, a, r),
    (this.framesCount = i),
    (this.animated = i > 1),
    this.addEventListener("changeframe", TilesSprite.changeStep),
    this.addEventListener("prerender", TilesSprite.sync);
}
function SimpleText(e, t, s, i) {
  (this.font = e),
    (this.x = 0),
    (this.y = 0),
    (this.width = t),
    (this.height = s),
    (this.align = SimpleText.ALIGN_LEFT),
    (this.rotation = 0),
    (this.charSpacing = 0),
    (this.scale = 1),
    (this.opacity = 1),
    (this["static"] = !1),
    (this.charMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
    (this.charWidth = []),
    (this.sprites = []),
    (this.text = ""),
    (this.stage = window.stage),
    (this.parent = window.stage),
    (this.ALIGN_LEFT = SimpleText.ALIGN_LEFT),
    (this.ALIGN_RIGHT = SimpleText.ALIGN_RIGHT),
    (this.ALIGN_CENTER = SimpleText.ALIGN_CENTER),
    (this.ignoreViewport = i);
}
function BitmapText(e, t) {
  (this.font = Utils.isArray(e) ? e : [e]),
    (this.charMap = t),
    (this.sprites = []),
    (this.lines = []),
    (this.stage = window.stage),
    (this.parent = window.stage);
}
function ProductionPet(e, t, s) {
  (this.name = e), (this.xmlName = t);
  var i = library.getAsset(this.name);
  Utils.callSuperConstructor(
    House,
    this,
    i.bitmap,
    i.width,
    i.height,
    i.framesCount,
    i.frames,
    i.layers
  );
  var a = config[this.xmlName];
  for (var r in a) this[r] = a[r];
  (this.hungry = 0),
    (this.life = this.HungryValue),
    (this.lifeLine = addSprite(
      !1,
      this.Life.Picture,
      1.5 * this.Life.position[0],
      1.5 * this.Life.position[1]
    )),
    this.lifeLine.stop(),
    this.addChild(this.lifeLine),
    (this.prodTimeout = 20);
  var o = random(750, 1250);
  (this.productionPeriod = this.prodTimeout * o),
    (this.productionTime = 0),
    (this.isFalling = !1),
    (this.action = ACTION_NORMAL),
    (this.state = 1),
    (this.animDelay = 1),
    (this.x = 120 + random(0, 275)),
    (this.y = 115 + random(0, 130) - 320);
}
function Animal(e, t, s) {
  (this.name = e), (this.xmlName = t);
  var i = library.getAsset(this.name);
  Utils.callSuperConstructor(
    House,
    this,
    i.bitmap,
    i.width,
    i.height,
    i.framesCount,
    i.frames,
    i.layers
  ),
    (this.isFalling = !1),
    (this.action = ACTION_NORMAL),
    (this.state = 1),
    (this.animDelay = 1),
    (this.cageEffect = 1);
}
function GameField(e) {
  Utils.callSuperConstructor(GameField, this),
    (this.pets = []),
    (this.grass = []),
    (this.buildings = []),
    (this.products = []),
    (this.bears = []),
    (this.dogs = []),
    (this.cats = []),
    (this.cats = []),
    (this.well = {}),
    (this.time = 0),
    (this.timer = 0),
    (this.miniMap = {}),
    (this.miniMapAvia = {}),
    (this.gameUI = {}),
    (this.car = {}),
    (this.miniCar = {}),
    (this.bigCar = {}),
    (this.carCurrency = 0),
    (this.aviaCurrency = 0),
    (this.petButtons = []),
    (this.upButtons = []),
    (this.starButtons = []),
    (this.places = []),
    (this.grounds = []),
    (this.bearsArray = []),
    (this.pause = !1),
    (this.action = ACTION_NONE),
    (this.state = STATE_NONE),
    (this.petsLost = !1),
    (this.bearsClick = !1),
    (this.withoutClick = !0),
    (this.withoutBearClick = !0),
    (this.noHintArrows = !0),
    (this.noHouseDestroyTimer = 3600),
    (this.noPetKillTimer = 1800),
    (this.airplaneHintTimer = 0),
    (this.curLevel = e),
    (this.endless = !1),
    (this.timeReal = 0),
    (this.timeGold = 0),
    (this.timeSilver = 0),
    (this.timePass = {}),
    (this.timeNeed = {}),
    (this.starsValue = {}),
    (this.stars = 0),
    (this.totalStars = 0),
    (this.goal = 1),
    (money = 0),
    (this.moneyGoal = 0),
    (this.xmlName = "Game");
  var t = config[this.xmlName];
  for (var s in t) this[s] = t[s];
  var i = config.CarMinimap;
  for (var s in i) this.miniMap[s] = i[s];
  var a = config.AviaMinimap;
  for (var s in a) this.miniMapAvia[s] = a[s];
  var r = config.GameUI;
  for (var s in r) this.gameUI[s] = r[s];
  var o = config.Car;
  for (var s in o) this.car[s] = o[s];
  this.petsNum = [];
  for (var n = 0; 4 > n; n++) this.petsNum[n] = 0;
  this.toGoals = [];
}
function Bear(e, t) {
  Utils.callSuperConstructor(
    Bear,
    this,
    "pets/bears/bear" + (t + 1) + "_left",
    "Bear"
  ),
    (this.up = t);
  var s = config[this.xmlName][this.xmlName + this.up];
  for (var i in s) this[i] = s[i];
  var a = config["CagedBear" + (this.up + 1)];
  for (var i in a) this[i] = a[i];
  (this.parent = e),
    this.parent.addChild(this),
    (this.up = t),
    (this.dogged = !1),
    (this.targeted = !1),
    (this.captured = !1),
    (this.tryToEscape = !1),
    (this.BrokeTime = this.Cage.Upgrades["Up" + config.accessCage].BrokeTime),
    (this.BuildSpeed = this.Cage.Upgrades["Up" + config.accessCage].BuildSpeed),
    (this.ProgressMaxValue =
      this.Cage.Upgrades["Up" + config.accessCage].ProgressMaxValue),
    (this.Progress = 0),
    (this.releaseTime = random(this.CageBrokeTime[0], this.CageBrokeTime[1])),
    (this.releaseTimePass = 0),
    (this.cage = addSprite(
      !1,
      "houses/cage/cage" + (config.accessCage + 1),
      0,
      0,
      1,
      this
    )),
    this.cage.stop(),
    (this.cage.visible = !1),
    (this.type = "bear" + (this.up + 1)),
    (this.x = 120 + random(0, 275)),
    (this.y = 115 + random(0, 130) - 1280),
    (this.onmousedown = function (e) {
      field.pause || this.isMoving || (landCheck = !0);
    }),
    (this.onmouseup = this.buildCage),
    this.appearShadow();
}
function Dog(e, t) {
  Utils.callSuperConstructor(
    Dog,
    this,
    "pets/dogs/dog" + (t + 1) + "_left",
    "Dog"
  ),
    (this.up = t);
  var s = config[this.xmlName][this.xmlName + this.up];
  for (var i in s) this[i] = s[i];
  (this.parent = e),
    this.parent.addChild(this),
    (this.up = t),
    (this.scareTime = []),
    (this.scareTime[0] = this.ScareTimePanda),
    (this.scareTime[1] = this.ScareTimeBrown),
    (this.scareTime[2] = this.ScareTimeGrizzly),
    (this.scareTime[3] = this.ScareTimeWhite),
    (this.x = 120 + random(0, 275)),
    (this.y = 115 + random(0, 130) - 320),
    this.appearShadow();
}
function Cat(e, t) {
  Utils.callSuperConstructor(
    Cat,
    this,
    "pets/cats/cat" + (t + 1) + "_left",
    "Cat"
  ),
    (this.up = t);
  var s = config[this.xmlName][this.xmlName + this.up];
  for (var i in s) this[i] = s[i];
  (this.parent = e),
    this.parent.addChild(this),
    (this.up = t),
    (this.moveToProduct = !1),
    (this.prob = []);
  for (var a = 0; a < this.ProbStupid; a++) this.prob.push("stupid");
  for (var a = 0; a < this.ProbSmart; a++) this.prob.push("smart");
  (this.x = 120 + random(0, 275)),
    (this.y = 115 + random(0, 130) - 320),
    this.appearShadow();
}
function Chicken(e) {
  Utils.callSuperConstructor(
    Chicken,
    this,
    "pets/chicken/chicken_left",
    "Chicken"
  ),
    (this.parent = e),
    (this.product = "Egg"),
    this.parent.addChild(this),
    (this.dieSound = "chicken_die"),
    (this.flyOutSound = "chicken_flyout"),
    (this.hungrySound = "chicken_hungry"),
    (this.landingSound = "chicken_voice"),
    this.appearShadow();
}
function Pig(e) {
  Utils.callSuperConstructor(Pig, this, "pets/pig/pig_left", "Pig"),
    (this.parent = e),
    (this.product = "Meat"),
    this.parent.addChild(this),
    (this.dieSound = "pig_die"),
    (this.flyOutSound = "pig_flyout"),
    (this.hungrySound = "pig_hungry"),
    (this.landingSound = "pig_voice"),
    this.appearShadow();
}
function Cow(e) {
  Utils.callSuperConstructor(Cow, this, "pets/cow/cow_left", "Cow"),
    (this.parent = e),
    (this.product = "Milk"),
    this.parent.addChild(this),
    (this.dieSound = "cow_die"),
    (this.flyOutSound = "cow_flyout"),
    (this.hungrySound = "cow_hungry"),
    (this.landingSound = "cow_voice"),
    this.appearShadow();
}
function Ostrich(e) {
  Utils.callSuperConstructor(
    Ostrich,
    this,
    "pets/ostrich/ostrich_left",
    "Ostrich"
  ),
    (this.parent = e),
    (this.product = "Plume"),
    this.parent.addChild(this),
    (this.dieSound = "ostrich_die"),
    (this.flyOutSound = "ostrich_flyout"),
    (this.hungrySound = "ostrich_hungry"),
    (this.landingSound = "ostrich_voice"),
    this.appearShadow();
}
function Grass(e, t, s) {
  (this.name = "misc/grass_new"), (this.xmlName = "Grass");
  var i = library.getAsset(this.name);
  Utils.callSuperConstructor(
    Grass,
    this,
    i.bitmap,
    i.width,
    i.height,
    i.frames,
    i.layers
  );
  var a = config[this.xmlName];
  for (var r in a) this[r] = a[r];
  (this.x = e),
    (this.y = t),
    this.setZIndex(1),
    (this.maxValue = this.Value),
    (this.Value = s),
    (this.state = STATE_GROW),
    stage.addChild(this);
}
function Production(e, t, s) {
  this.xmlName = e;
  var i = config[this.xmlName];
  for (var a in i) this[a] = i[a];
  (this.name = this.Picture), (this.type = this.name.slice(9));
  var r = library.getAsset(this.name);
  Utils.callSuperConstructor(
    Production,
    this,
    r.bitmap,
    r.width,
    r.height,
    r.frames,
    r.layers
  ),
    (this.x = t),
    (this.y = s),
    (this.isMoving = !1),
    (this.onDepot = !1),
    (this.parashute = {}),
    (this.isFalling = !1),
    this.setZIndex(this.y + this.height / 2),
    this.stop(),
    (this.timeToDeath = 0),
    (this.warning = !1),
    (this.onmousedown = function (e) {
      field.pause || this.isMoving || (setFirstFrame(e), (landCheck = !0));
    }),
    (this.onmouseout = setZeroFrame),
    (this.onmouseup = function (e) {
      if (!field.pause && !this.isMoving) {
        if (
          ((field.withoutClick = !1),
          setZeroFrame(e),
          !(depot.realCapacity + this.DepotSize <= depot.capacity) ||
            this.onDepot)
        )
          return depot.hintArrow(), !1;
        this.moveToDepot(e);
      }
    });
}
function Depot() {
  this.xmlName = "Depot";
  var e = config[this.xmlName];
  for (var t in e) this[t] = e[t];
  (this.name = this.Upgrades.Up0.Picture),
    (this.capacity = this.Upgrades.Up0.Capacity),
    (this.realCapacity = 0),
    (this.ceilSize = this.capacity / 40);
  var s = library.getAsset(this.name);
  Utils.callSuperConstructor(
    Depot,
    this,
    s.bitmap,
    s.width,
    s.height,
    s.frames,
    s.layers
  ),
    this.setZIndex(this.y + this.height / 2),
    (this.marketPetMode = !1),
    config.accessDepot > 0 &&
      ((this.up = addSprite(
        !1,
        this.UpgradeButton.Picture,
        this.UpgradeButton.position[0],
        this.UpgradeButton.position[1],
        1,
        this
      )),
      this.up.stop(),
      (this.curUp = 0),
      (this.up.cost =
        config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
      field.upButtons.push(this.up),
      (this.numbers = numbersGold(this.up.cost, 0, 15, 1, this.up, 2, -3)),
      (this.starUp = addSprite(
        !1,
        "buttons/but_star",
        this.UpgradeButton.position[0],
        this.UpgradeButton.position[1],
        1,
        this
      )),
      this.starUp.stop(),
      (this.starUp.cost =
        config.Game.EndlessMode.OpeningCosts.Item[xmlNameToUp(this.xmlName)].c[
          this.curUp
        ].cost),
      field.starButtons.push(this.starUp),
      (this.numbersStar = numbersGold(
        this.starUp.cost,
        0,
        15,
        1,
        this.starUp,
        2,
        -3
      )),
      field.endless ? (this.up.visible = !1) : (this.starUp.visible = !1)),
    (this.productsArray = []),
    (this.p = []),
    (this.w = []),
    (this.c = []),
    (this.hint = {}),
    (this.profit = 0),
    (this.debt = 0),
    (this.booking = []);
  for (var i = 0; 25 > i; i++) (this.p[i] = 0), (this.w[i] = 0);
  for (var i = 0; 29 > i; i++) this.c[i] = 0;
  this.confUI = {};
  var a = config.CarUI;
  for (var t in a) this.confUI[t] = a[t];
  this.confAviaUI = {};
  var r = config.AviaUI;
  for (var t in r) this.confAviaUI[t] = r[t];
  (this.shelves = []),
    (this.petShelves = []),
    (this.boxes = []),
    (this.onmouseup = this.createMenu);
}
function House(e, t, s, i) {
  this.xmlName = e;
  var a = config[this.xmlName];
  for (var r in a) this[r] = a[r];
  this.name = this.Upgrades["Up" + t].Picture;
  var o = library.getAsset(this.name);
  Utils.callSuperConstructor(
    House,
    this,
    o.bitmap,
    o.width,
    o.height,
    o.framesCount,
    o.frames,
    o.layers
  ),
    (this.productionNumber = this.Upgrades["Up" + t].ProductionNum),
    (this.productionTime = 1e3 * this.Upgrades["Up" + t].MaxProductionTime),
    (this.deltaTimePart = this.Upgrades["Up" + t].Overload.DeltaTimePart),
    (this.clicksNum = this.Upgrades["Up" + t].Overload.ClicksNum),
    (this.overloadClick =
      (this.deltaTimePart * this.productionTime) / this.clicksNum),
    (this.recoverySpeed = this.Upgrades["Up" + t].Overload.RecoverySpeed),
    (this.overloadMax = this.Upgrades["Up" + t].Overload.ClicksNumMax),
    (this.overload = this.overloadMax),
    (this.time = 0),
    (this.onBusy = !1),
    (this.onProduction = !1),
    (this.returnedProductsNum = 1),
    (this.isFalling = !1),
    (this.isStart = !1),
    (this.x = s),
    (this.y = i),
    (this.bottom = this.y + this.height / 2),
    (this.curUp = t),
    this.setPropScale(0.9);
  var n = this.x < 240 ? -1 : 1;
  (this.indicator = addSprite(
    !1,
    "misc/indicator_house",
    -n * this.Progress.position[0] * 0.45,
    this.height / 2 - 40,
    1,
    this
  )),
    this.indicator.stop(),
    (this.overloadLine = addSprite(
      !1,
      "misc/main_line",
      -3,
      0,
      1,
      this.indicator
    )),
    (this.overloadLine.scaleY = -1),
    (this.overloadHeight = this.overloadLine.height),
    (this.overloadY = this.overloadLine.y),
    (this.up = addSprite(
      !1,
      "buttons/button_upgrade_money",
      n * this.UpgradeButton.position[0] * 0,
      this.height / 2 - 20,
      1,
      this
    )),
    this.up.stop(),
    (this.up.cost =
      config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
    (this.starUp = addSprite(
      !1,
      "buttons/but_star",
      n * this.UpgradeButton.position[0] * 0,
      this.height / 2 - 20,
      1,
      this
    )),
    this.starUp.stop(),
    (this.starUp.cost =
      config.Game.EndlessMode.OpeningCosts.Item[xmlNameToUp(this.xmlName)].c[
        this.curUp
      ].cost),
    field.upButtons.push(this.up),
    field.starButtons.push(this.starUp),
    (this.numbers = numbersGold(this.up.cost, 0, 15, 1, this.up, 2, -3)),
    (this.numbersStar = numbersGold(
      this.starUp.cost,
      0,
      15,
      1,
      this.starUp,
      2,
      -3
    )),
    this.curUp == config["access" + this.xmlName] - 1 &&
      ((this.up.visible = !1), (this.starUp.visible = !1)),
    field.endless ? (this.up.visible = !1) : (this.starUp.visible = !1),
    this.stop(),
    (this.onmousedown = function () {
      return !1;
    }),
    (this.onmouseup = function () {
      return (
        field.pause ||
          this.isFalling ||
          (this.onBusy ? this.overloadProduction() : this.checkDepot()),
        !1
      );
    });
}
function HousePlace(e, t, s) {
  (this.xmlName = e + "Place"), (this.xmlHouse = e);
  var i = config[this.xmlName];
  for (var a in i) this[a] = i[a];
  this.name = this.Picture;
  var r = library.getAsset(this.name);
  Utils.callSuperConstructor(
    HousePlace,
    this,
    r.bitmap,
    r.width,
    r.height,
    r.frames,
    r.layers
  ),
    (this.x = t),
    (this.y = s),
    (this.bottom = this.y + this.height / 2),
    (this.up = addSprite(
      !1,
      "buttons/button_upgrade_money",
      20,
      this.height / 2 - 12,
      1,
      this
    )),
    this.up.stop(),
    (this.up.cost =
      config.Game.Costs.Item[xmlNameToUp(this.xmlHouse)].c[0].cost),
    field.upButtons.push(this.up),
    (this.starUp = addSprite(
      !1,
      "buttons/but_star",
      20,
      this.height / 2 - 12,
      1,
      this
    )),
    this.starUp.stop(),
    (this.starUp.cost =
      config.Game.EndlessMode.OpeningCosts.Item[
        xmlNameToUp(this.xmlHouse)
      ].c[0].cost),
    field.starButtons.push(this.starUp),
    field.endless ? (this.up.visible = !1) : (this.starUp.visible = !1),
    (this.isFalling = !0),
    (this.numbers = numbersGold(this.up.cost, 0, 15, 1, this.up, 2, -3)),
    (this.numbersStar = numbersGold(
      this.starUp.cost,
      0,
      15,
      1,
      this.starUp,
      2,
      -3
    ));
}
function Well(e) {
  this.xmlName = "Well";
  var t = config[this.xmlName];
  for (var s in t) this[s] = t[s];
  this.name = this.Upgrades["Up" + e].Picture;
  var i = library.getAsset(this.name);
  Utils.callSuperConstructor(
    House,
    this,
    i.bitmap,
    i.width,
    i.height,
    i.framesCount,
    i.frames,
    i.layers
  ),
    (this.indicator = addSprite(
      !1,
      this.Progress.Picture,
      0.45 * this.Progress.position[0],
      this.y,
      1,
      this
    )),
    this.indicator.stop(),
    (this.waterActual = this.Progress.ProgressCurrentValue),
    (this.waterMax = this.Progress.ProgressMaxValue),
    (this.delta = this.Upgrades["Up" + e].DeltaWater),
    (this.reloadTime = this.Upgrades["Up" + e].ReloadTime),
    (this.reloading = !1),
    (this.fillCost = this.Upgrades["Up" + e].FillWellCost),
    (this.autoFillTime = 0),
    (this.curUp = e),
    (this.up = addSprite(
      !1,
      "buttons/button_upgrade_money",
      0.5 * this.UpgradeButton.position[0],
      this.height / 2 - 45,
      1,
      this
    )),
    this.up.stop(),
    (this.up.cost =
      config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
    (this.starUp = addSprite(
      !1,
      "buttons/but_star",
      0.5 * this.UpgradeButton.position[0],
      this.height / 2 - 45,
      1,
      this
    )),
    this.starUp.stop(),
    (this.starUp.cost =
      config.Game.EndlessMode.OpeningCosts.Item[xmlNameToUp(this.xmlName)].c[
        this.curUp
      ].cost),
    (this.numbers = numbersGold(this.up.cost, 0, 15, 1, this.up, 2, -3)),
    (this.numbersStar = numbersGold(
      this.starUp.cost,
      0,
      15,
      1,
      this.starUp,
      2,
      -3
    )),
    field.upButtons.push(this.up),
    field.starButtons.push(this.starUp),
    field.endless ? (this.up.visible = !1) : (this.starUp.visible = !1),
    this.curUp == config["access" + this.xmlName] &&
      ((this.up.visible = !1), (this.starUp.visible = !1)),
    (this.coin = addSprite(
      !1,
      "ui_level/gold_coin",
      0,
      -20,
      0.8,
      this.indicator
    )),
    this.coin.gotoAndStop(4),
    (this.coin.visible = !1),
    (this.autoFill = !1),
    (this.hint = !1),
    (this.numbersCost = numbersSilver(
      this.fillCost,
      10,
      0,
      1,
      this.coin,
      0,
      -2
    )),
    (this.isFalling = !0),
    (this.x = this.position[0]),
    (this.y = this.position[1]),
    this.stop(),
    (this.onmouseup = function () {
      this.isFalling ||
        field.pause ||
        (3 != this.curUp ? this.fill() : this.switchToAutoFill());
    });
}
function Car(e) {
  this.xmlName = "Car";
  var t = config[this.xmlName];
  for (var s in t) this[s] = t[s];
  (this.curUp = e), (this.name = this.Upgrades["Up" + this.curUp].Picture);
  var i = library.getAsset(this.name);
  Utils.callSuperConstructor(
    Car,
    this,
    i.bitmap,
    i.width,
    i.height,
    i.frames,
    i.layers
  ),
    (this.up = addSprite(
      !1,
      "buttons/button_upgrade_money",
      0.5 * this.UpgradeButton.position[0],
      this.height / 2 - 25,
      1,
      this
    )),
    this.up.stop(),
    (this.up.cost =
      config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
    (this.starUp = addSprite(
      !1,
      "buttons/but_star",
      0.5 * this.UpgradeButton.position[0],
      this.height / 2 - 25,
      1,
      this
    )),
    this.starUp.stop(),
    (this.starUp.cost =
      config.Game.EndlessMode.OpeningCosts.Item[xmlNameToUp(this.xmlName)].c[
        this.curUp
      ].cost),
    field.starButtons.push(this.starUp),
    field.upButtons.push(this.up),
    (this.numbers = numbersGold(this.up.cost, 0, 15, 1, this.up, 2, -3)),
    (this.numbersStar = numbersGold(
      this.starUp.cost,
      0,
      15,
      1,
      this.starUp,
      2,
      -3
    )),
    this.curUp == config["access" + this.xmlName] &&
      ((this.up.visible = !1), (this.starUp.visible = !1)),
    field.endless ? (this.up.visible = !1) : (this.starUp.visible = !1),
    (this.onmouseup = function () {
      return field.pause || field.action != ACTION_NONE
        ? void 0
        : (depot.createMenu(), !1);
    }),
    (this.x = this.position[0] - 20),
    (this.y = this.position[1]);
}
function Avia(e) {
  this.xmlName = "Avia";
  var t = config[this.xmlName];
  for (var s in t) this[s] = t[s];
  (this.curUp = e), (this.name = this.Upgrades["Up" + this.curUp].Picture);
  var i = library.getAsset(this.name);
  Utils.callSuperConstructor(
    Car,
    this,
    i.bitmap,
    i.width,
    i.height,
    i.frames,
    i.layers
  ),
    (this.up = addSprite(
      !1,
      "buttons/button_upgrade_money",
      0.5 * this.UpgradeButton.position[0],
      this.height / 2 - 15,
      1,
      this
    )),
    this.up.stop(),
    (this.up.cost =
      config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
    (this.starUp = addSprite(
      !1,
      "buttons/but_star",
      0.5 * this.UpgradeButton.position[0],
      this.height / 2 - 15,
      1,
      this
    )),
    this.starUp.stop(),
    (this.starUp.cost =
      config.Game.EndlessMode.OpeningCosts.Item[xmlNameToUp(this.xmlName)].c[
        this.curUp
      ].cost),
    field.upButtons.push(this.up),
    field.starButtons.push(this.starUp),
    (this.numbers = numbersGold(this.up.cost, 0, 15, 1, this.up, 2, -3)),
    (this.numbersStar = numbersGold(
      this.starUp.cost,
      0,
      15,
      1,
      this.starUp,
      2,
      -3
    )),
    this.curUp == config["access" + this.xmlName] &&
      ((this.up.visible = !1), (this.starUp.visible = !1)),
    field.endless ? (this.up.visible = !1) : (this.starUp.visible = !1),
    (this.onmouseup = function () {
      return field.pause || field.state != STATE_NONE
        ? void 0
        : (depot.createMenuAvia(), !1);
    }),
    (this.x = this.position[0] - 20),
    (this.y = this.position[1]);
}
function startLoad() {
  var e = Utils.getMobileScreenResolution(LANDSCAPE_MODE);
  (GET.debug ||
    Utils.mobileCheckSlowDevice() ||
    (Utils.touchScreen && (Utils.isFirefox() || Utils.isPlayFreeBrowser()))) &&
    (e = Utils.getScaleScreenResolution(1, LANDSCAPE_MODE)),
    (Utils.globalScale = e.scale),
    Utils.createLayout(document.getElementById(Utils.DOMMainContainerId), e),
    Utils.addEventListener("fitlayout", function () {
      stage &&
        (stage.drawScene(stage.canvas),
        stage.drawScene(stage.backgroundCanvas, !0)),
        resizeCSSBack();
    }),
    Utils.addEventListener("lockscreen", function () {
      stage && stage.started && stage.stop();
    }),
    Utils.addEventListener("unlockscreen", function () {
      stage && !stage.started && stage.start();
    }),
    Utils.mobileHideAddressBar(),
    GET.debug || Utils.checkOrientation(LANDSCAPE_MODE);
  Utils.imagesRoot + "/" + Utils.globalScale + "/", new ImagesPreloader();
  TTLoader.create(loadSoundsEnd, !0),
    (library = new AssetsLibrary("images", Utils.globalScale)),
    loadStartupAssets();
}
function loaderLock(e) {
  stage &&
    (e
      ? lockMC ||
        ((lockMC = new Sprite(null, stage.screenWidth, stage.screenHeight)),
        (lockMC.ignoreViewport = !0),
        lockMC.setPosition(stage.screenWidth / 2, stage.screenHeight / 2),
        (lockMC.fillColor = "rgba(0,0,0,0.5)"),
        lockMC.addChild(library.getSprite("hourglass")),
        lockMC.addEventListener("touchstart", function () {
          return !1;
        }),
        lockMC.addEventListener("mousedown", function () {
          return !1;
        }),
        lockMC.addEventListener("click", function () {
          return !1;
        }),
        lockMC.addEventListener("touchend", function () {
          return !1;
        }),
        lockMC.addEventListener("mouseup", function () {
          return !1;
        }),
        lockMC.addEventListener("mousemove", function () {
          return !1;
        }),
        stage.addChild(lockMC))
      : (lockMC && (lockMC.destroy = !0), (lockMC = null)));
}
function loadStartupAssets() {
  return loadMoreAssets(loadImagesEnd);
}
function loadMoreAssets(e) {
  if (assets.length > 0) {
    var t = assets.shift();
    if (!SPLIT_LOADING) for (; assets.length; ) t = t.concat(assets.shift());
    if (t && t.length > 0)
      return (
        loaderLock(!0),
        library.addAssets(t),
        library.load(
          function () {
            loaderLock(!1), "function" == typeof e && e([]);
          },
          TTLoader.showLoadProgress,
          null,
          50
        ),
        !0
      );
  }
  return loaderLock(!1), "function" == typeof e && e([]), !1;
}
function parsingConfig(e) {
  function t(e) {
    (config[a.name] = new classConfig(e.documentElement)), s();
  }
  function s() {
    return (
      r++,
      (a = i[r])
        ? void Utils.get("data/" + a.path + ".xml", null, "xml", t)
        : void (e && e())
    );
  }
  var i = [];
  i.push({ name: "Grass", path: "Grass" }),
    i.push({ name: "LevelsRecords", path: "LevelsRecords" }),
    i.push({ name: "Shop", path: "Shop" }),
    i.push({ name: "Map", path: "Map" }),
    i.push({ name: "Gags", path: "Gags" }),
    i.push({ name: "Bear", path: "pets/Bear" }),
    i.push({ name: "Dog", path: "pets/Dog" }),
    i.push({ name: "Cat", path: "pets/Cat" }),
    i.push({ name: "Chicken", path: "pets/Chicken" }),
    i.push({ name: "Ostrich", path: "pets/Ostrich" }),
    i.push({ name: "Cow", path: "pets/Cow" }),
    i.push({ name: "Game", path: "Game" }),
    i.push({ name: "GameUI", path: "GameUI" }),
    i.push({ name: "Pig", path: "pets/Pig" }),
    i.push({ name: "Meat", path: "products/Meat" }),
    i.push({ name: "Egg", path: "products/Egg" }),
    i.push({ name: "Butter", path: "products/Butter" }),
    i.push({ name: "CagedBear1", path: "products/CagedBear1" }),
    i.push({ name: "CagedBear2", path: "products/CagedBear2" }),
    i.push({ name: "CagedBear3", path: "products/CagedBear3" }),
    i.push({ name: "CagedBear4", path: "products/CagedBear4" }),
    i.push({ name: "Cake", path: "products/Cake" }),
    i.push({ name: "CarnivalDress", path: "products/CarnivalDress" }),
    i.push({ name: "Cheese", path: "products/Cheese" }),
    i.push({ name: "CheeseFerment", path: "products/CheeseFerment" }),
    i.push({ name: "DriedEggs", path: "products/DriedEggs" }),
    i.push({ name: "Fan", path: "products/Fan" }),
    i.push({ name: "Flour", path: "products/Flour" }),
    i.push({ name: "FlouryCake", path: "products/FlouryCake" }),
    i.push({ name: "Hat", path: "products/Hat" }),
    i.push({ name: "MeatBacon", path: "products/MeatBacon" }),
    i.push({ name: "MeatPack", path: "products/MeatPack" }),
    i.push({ name: "MeatPacket", path: "products/MeatPacket" }),
    i.push({ name: "MeatSirloin", path: "products/MeatSirloin" }),
    i.push({ name: "Milk", path: "products/Milk" }),
    i.push({ name: "Plume", path: "products/Plume" }),
    i.push({ name: "PlumedHat", path: "products/PlumedHat" }),
    i.push({ name: "SourCream", path: "products/SourCream" }),
    i.push({ name: "Textile", path: "products/Textile" }),
    i.push({ name: "ButterHouse", path: "houses/ButterHouse" }),
    i.push({ name: "CakeHouse", path: "houses/CakeHouse" }),
    i.push({ name: "CarnivalDressHouse", path: "houses/CarnivalDressHouse" }),
    i.push({ name: "CheeseHouse", path: "houses/CheeseHouse" }),
    i.push({ name: "Depot", path: "houses/Depot" }),
    i.push({ name: "DriedEggsHouse", path: "houses/DriedEggsHouse" }),
    i.push({ name: "FanHouse", path: "houses/FanHouse" }),
    i.push({ name: "FlouryCakeHouse", path: "houses/FlouryCakeHouse" }),
    i.push({ name: "MeatHouse", path: "houses/MeatHouse" }),
    i.push({ name: "MeatPacketHouse", path: "houses/MeatPacketHouse" }),
    i.push({ name: "MeatSpiceHouse", path: "houses/MeatSpiceHouse" }),
    i.push({ name: "PlumedHatHouse", path: "houses/PlumedHatHouse" }),
    i.push({ name: "SourCreamHouse", path: "houses/SourCreamHouse" }),
    i.push({ name: "Well", path: "houses/Well" }),
    i.push({ name: "ButterHousePlace", path: "places/ButterHousePlace" }),
    i.push({ name: "CakeHousePlace", path: "places/CakeHousePlace" }),
    i.push({
      name: "CarnivalDressHousePlace",
      path: "places/CarnivalDressHousePlace",
    }),
    i.push({ name: "CheeseHousePlace", path: "places/CheeseHousePlace" }),
    i.push({ name: "DriedEggsHousePlace", path: "places/DriedEggsHousePlace" }),
    i.push({ name: "FanHousePlace", path: "places/FanHousePlace" }),
    i.push({
      name: "FlouryCakeHousePlace",
      path: "places/FlouryCakeHousePlace",
    }),
    i.push({ name: "MeatHousePlace", path: "places/MeatHousePlace" }),
    i.push({
      name: "MeatPacketHousePlace",
      path: "places/MeatPacketHousePlace",
    }),
    i.push({ name: "MeatSpiceHousePlace", path: "places/MeatSpiceHousePlace" }),
    i.push({ name: "PlumedHatHousePlace", path: "places/PlumedHatHousePlace" }),
    i.push({ name: "SourCreamHousePlace", path: "places/SourCreamHousePlace" }),
    i.push({ name: "Car", path: "level/car/Car" }),
    i.push({ name: "CarUI", path: "level/car/CarUI" }),
    i.push({ name: "CarMinimap", path: "level/car/Minimap" }),
    i.push({ name: "CarToMarket", path: "level/car/ToMarket" }),
    i.push({ name: "Avia", path: "level/avia/Airplane" }),
    i.push({ name: "AviaUI", path: "level/avia/AirplaneUI" }),
    i.push({ name: "AviaFromMarket", path: "level/avia/FromMarket" }),
    i.push({ name: "AviaMinimap", path: "level/avia/Minimap" });
  var a = null,
    r = -1;
  s();
}
function loadImagesEnd(e) {
  parsingConfig();
  var t = [],
    s = new SoundsPreloader();
  (s.maxProgressVal = 50),
    (s.minProgressVal = 50),
    s.load(t, TTLoader.loadComplete, TTLoader.showLoadProgress);
}
function loadSoundsEnd() {
  Utils.showMainLayoutContent(),
    (mixer = new AudioMixer("sounds", 5)),
    isWebAudio || (soundOn = !1),
    loadGameData(preloadComplete),
    loadMoreAssets();
}
function loadMoreSounds() {
  var e = [],
    t = "sounds/";
  e.push(t + "action_sell_buy"),
    e.push(t + "action_upgrade"),
    e.push(t + "action_watering"),
    e.push(t + "action_well"),
    e.push(t + "action_well_auto"),
    e.push(t + "airplane_flyin"),
    e.push(t + "bear_landing"),
    e.push(t + "bear0_scream"),
    e.push(t + "bear0_scare_flee"),
    e.push(t + "bear1_scream"),
    e.push(t + "bear1_scare_flee"),
    e.push(t + "bear2_scream"),
    e.push(t + "bear3_scream"),
    e.push(t + "cage_breaking"),
    e.push(t + "cage_broke_bear_flee"),
    e.push(t + "cage_click"),
    e.push(t + "car_came"),
    e.push(t + "cat_flyout"),
    e.push(t + "cat_voice"),
    e.push(t + "chicken_die"),
    e.push(t + "chicken_flyout"),
    e.push(t + "chicken_hungry"),
    e.push(t + "chicken_voice"),
    e.push(t + "cow_die"),
    e.push(t + "cow_flyout"),
    e.push(t + "cow_hungry"),
    e.push(t + "cow_voice"),
    e.push(t + "dog_voice"),
    e.push(t + "dog0_bay"),
    e.push(t + "dog1_bay"),
    e.push(t + "dog2_bay"),
    e.push(t + "dog3_bay"),
    e.push(t + "fanfare_aim"),
    e.push(t + "fanfare_award"),
    e.push(t + "fanfare_best_time"),
    e.push(t + "fanfare_level_complete"),
    e.push(t + "fanfare_medal"),
    e.push(t + "fool_action"),
    e.push(t + "gag_hit"),
    e.push(t + "house_board_landing"),
    e.push(t + "house_click"),
    e.push(t + "house_crash"),
    e.push(t + "house_downgrade"),
    e.push(t + "house_landing"),
    e.push(t + "item_add"),
    e.push(t + "item_cancel"),
    e.push(t + "music_game"),
    e.push(t + "ostrich_die"),
    e.push(t + "ostrich_flyout"),
    e.push(t + "ostrich_hungry"),
    e.push(t + "ostrich_voice"),
    e.push(t + "pig_die"),
    e.push(t + "pig_flyout"),
    e.push(t + "pig_hungry"),
    e.push(t + "pig_voice"),
    e.push(t + "product_crack"),
    e.push(t + "product_landing"),
    e.push(t + "product_take"),
    e.push(t + "tick_money"),
    e.push(t + "tick_time"),
    e.push(t + "ui_button_click"),
    e.push(t + "ui_button_hover"),
    new SoundsPreloader().load(e, function () {});
}
function preloadComplete() {
  GET.debug || ExternalAPI.exec("showCompanyLogo", showMenu) || showMenu();
}
function setCSSBack(e, t) {
  var s = document.getElementById(Utils.DOMScreenBackgroundContainerId);
  e &&
    ((backgroundImage = e), (s.style.backgroundImage = "url(" + e.src + ")")),
    t && (s.style.backgroundColor = t),
    (s.style.backgroundPosition = "center top"),
    (s.style.backgroundRepeat = "no-repeat"),
    resizeCSSBack();
}
function resizeCSSBack() {
  if (backgroundImage) {
    var e = Utils.getWindowRect(),
      t = e.height / backgroundImage.height,
      s = Math.floor(backgroundImage.width * t),
      i = Math.floor(backgroundImage.height * t);
    document.getElementById(
      Utils.DOMScreenBackgroundContainerId
    ).style.backgroundSize = s + "px " + i + "px";
  }
}
function showMenu() {
  (gameState = STATE_MENU), createScene();
}
function showShop() {
  (gameState = STATE_SHOP), createScene();
}
function showMap() {
  return assets.length > 0
    ? loadMoreAssets(function () {
        loadMoreSounds(), showMap();
      })
    : ((gameState = STATE_MAP), void createScene());
}
function showAwardsRoom() {
  (gameState = STATE_AWARDS), createScene();
}
function createStage() {
  stage && (stage.destroy(), stage.stop()),
    (stage = new Stage("screen", 480, 320, !1)),
    stage.setBackgroundCanvas("screen_background"),
    (stage.delay = 1e3 / fps),
    (stage.onpretick = preTick),
    (stage.onposttick = postTick),
    (stage.ceilSizes = !0),
    (stage.showFPS = !1);
}
function createScene() {
  if (
    (createStage(),
    gameState == STATE_MENU && buildMenu(),
    gameState == STATE_SHOP)
  ) {
    getAccesses();
    var e = addSprite(!0, config.Shop.Background.Picture[0].Picture, 240, 160);
    ExternalAPI.exec("addLogo", 60, 18),
      ExternalAPI.exec("addKiz10Logo", 60, 18),
      (e.onmousedown = function () {
        hint.active && !hint.noAction && ((hint.destroy = !0), (hint = {}));
      }),
      (e.onmouseup = function (e) {
        hint.active && hint.noAction && ((hint.destroy = !0), (hint = {})),
          createHint(15, 2, stage, 170, 140, !0, 5, -10, !1);
      }),
      addSprite(
        !1,
        config.Shop.Background.Picture[1].Picture,
        240,
        0.533 * config.Shop.Background.Picture[1].position[1]
      );
    var t = numbersShop(
      gameData.stars,
      240,
      0.533 * config.Shop.MoneyText.position[1],
      1,
      stage,
      2,
      -3
    );
    textBold(
      240,
      20,
      I18.f(config.Shop.Caption.String),
      20,
      stage,
      2,
      "bold",
      "#8B4513",
      null,
      0.6
    );
    var s = addSprite(
      !1,
      "buttons/button_5",
      0.6 * config.Shop.OkButton.position[0],
      0.533 * config.Shop.OkButton.position[1] - 5
    );
    s.stop(),
      (s.onmousedown = setFirstFrame),
      (s.onmouseout = setZeroFrame),
      (s.onmouseup = function (e) {
        playSound("ui_button_click"), setZeroFrame(e), showMap();
      }),
      textFutura(0, -2, I18.f(config.Shop.OkButton.Text.String), 12, s, 2);
    for (var i = [], a = 0; a < config.Shop.Items.i.length; a++) {
      i[a] = {};
      var r = config.Shop.Items.i[a];
      if (r.Icon.States["i" + gameData.upgrades[a]]) {
        var o = addSprite(
          !1,
          "shop/shop_layer",
          0.6 * r.position[0],
          0.533 * (r.position[1] + r.Tile.position[1])
        );
        if ((o.stop(), a >= 7 && 0 == gameData.accessHouses[a - 7]))
          o.visible = !1;
        else {
          textFutura(
            0.6 * r.CaptionText.position[0],
            0.533 * r.CaptionText.position[1] - 2,
            I18.f(r.CaptionText.String),
            10,
            o,
            2
          );
          var s = addSprite(
            !1,
            r.Icon.States.i1.Picture,
            0.6 * r.Icon.position[0],
            0.533 * r.Icon.position[1],
            1,
            o
          );
          s.gotoAndStop(gameData.upgrades[a]);
          var s = addSprite(
            !1,
            "buttons/button_star",
            0.6 * r.BuyButton.position[0],
            0.533 * r.BuyButton.position[1] - 1,
            1,
            o
          );
          s.stop(),
            (s.cost = r.Icon.States["i" + gameData.upgrades[a]].Price),
            (s.index = a),
            gameData.stars < s.cost
              ? (s.gotoAndStop(3), s.parent.gotoAndStop(1))
              : ((s.onmousedown = setFirstFrame),
                (s.onmouseout = setZeroFrame),
                (s.onmouseup = function (e) {
                  (hint && hint.noAction) ||
                    (playSound("ui_button_click"),
                    setZeroFrame(e),
                    addStars(-e.target.cost),
                    t.write(gameData.stars),
                    gameData.upgrades[e.target.index]++,
                    saveGameData(gameData),
                    setAccesses(),
                    showShop());
                }));
          numbersSilver(s.cost, 11, 0, 1, s, 1, -3);
          a >= 7 &&
            gameData.upgrades[a] < gameData.accessHouses[a - 7] &&
            addSprite(!1, "misc/red_arrow", 20, -10, 1, o);
        }
      } else {
        var s = addSprite(
          !1,
          r.Icon.States.i1.Picture,
          0.6 * (r.position[0] + r.Icon.position[0]),
          0.533 * (r.position[1] + r.Icon.position[1])
        );
        s.gotoAndStop(gameData.upgrades[a] - 1),
          addSprite(
            !1,
            "shop/shop_ok",
            0.6 * (r.position[0] + r.Icon.position[0]),
            0.533 * (r.position[1] + r.BuyButton.position[1] - 4)
          );
      }
    }
    createHint(14, 7, stage, 240, 160, !0, 5, -25, !0);
  }
  if ((gameState == STATE_MAP && buildMap(), gameState == STATE_AWARDS)) {
    var e = addSprite(!0, "awards/back_award_2", 240, 160);
    ExternalAPI.exec("addLogo", 60, 18),
      ExternalAPI.exec("addKiz10Logo", 60, 18),
      (e.onmousedown = function (e) {
        hintAward && (hintAward.destroy = !0);
      });
    for (var n = 0; 19 > n; n++) gameData.awards[n] && addAwardIcon(n);
    var s = addSprite(!1, "buttons/button_6", 240, 295);
    s.stop(),
      (s.onmousedown = setFirstFrame),
      (s.onmouseout = setZeroFrame),
      (s.onmouseup = function (e) {
        playSound("ui_button_click"), setZeroFrame(e), showMenu();
      }),
      textFutura(0, -1, I18.f("ok"), 10, s, 2),
      textBold(
        0,
        -140,
        I18.f("high_score"),
        20,
        e,
        2,
        "bold",
        "#8B4513",
        null,
        0.5
      );
  }
  stage.start(), stage.refreshBackground();
}
function launchLoadScreen(e) {
  var t = ExternalAPI.exec("showWelcomeScreen", stage, {
    windowBack: library.getBitmap("main_menu_popup_window/main_menu_popup"),
    buttonBack: library.getBitmap("main_menu_popup_window/main_menu_btn"),
    headerColor: "rgb(255,254,4)",
    headerStroke: "rgb(139,70,32)",
    textColor: "rgb(255,255,255)",
    textStroke: "rgb(139,70,32)",
    buttonColor: "rgb(255,255,255)",
    buttonStroke: "rgb(0,0,0)",
    onSelect: function (t) {
      t.target.safeRemove(), loadGameData(e);
    },
  });
  t || e();
}
function buildMenu() {
  function e(e) {
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0), o();
    });
  }
  function t() {
    var t = addSprite(!1, "main/option_send2", 240, 160);
    (t.opacity = 0),
      t.fadeTo(1, 500),
      textFutura(0, -11, I18.f("sound"), 12, t, 2, null, "#000000", "#000000"),
      textFutura(-1, 14, I18.f("music"), 12, t, 2, null, "#000000", "#000000");
    var s = addSprite(!1, "main/checkbox", 40, -11, 1, t),
      i = soundOn ? 0 : 1;
    s.gotoAndStop(i), (s.onmouseup = toggleSound);
    var s = addSprite(!1, "main/checkbox", 40, 14, 1, t),
      i = musicOn ? 0 : 1;
    s.gotoAndStop(i), (s.onmouseup = toggleMusic);
    var s = addSprite(!1, "buttons/button_6", 0, 55, 1, t);
    s.stop(),
      (s.onmousedown = setFirstFrame),
      (s.onmouseout = setZeroFrame),
      (s.onmouseup = function (s) {
        playSound("ui_button_click"), setZeroFrame(s), e(t);
      }),
      textFutura(0, -2, I18.f("ok"), 12, s, 2);
  }
  function s(e) {
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0), t();
    });
  }
  function i(e) {
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0), r();
    });
  }
  function a(t) {
    I18.init(t.target.type), e(t.target.parent);
  }
  function r() {
    var e = addSprite(!1, "main/main_menu_panel", 240, 160);
    (e.opacity = 0), e.fadeTo(1, 500);
    var t = 0,
      s = 0,
      i = I18.supportedLanguage.length > 4 ? -40 : -20;
    I18.supportedLanguage.length > 6 && (i = -38);
    for (
      var r = I18.supportedLanguage.length > 6 ? 50 : 60,
        o = I18.supportedLanguage.length > 6 ? 2 : 1,
        n = I18.supportedLanguage.length > 6 ? -50 : -30,
        h = 0;
      h < I18.supportedLanguage.length;
      h++
    )
      (mc = addSprite(
        !1,
        "flags/" + I18.supportedLanguage[h],
        n + t * r,
        i + 40 * s,
        1.3,
        e
      )),
        (mc.type = I18.supportedLanguage[h]),
        (mc.onmouseup = a),
        t++,
        t > o && ((t = 0), s++);
  }
  function o() {
    var e = "ru" == I18.currentLocale ? "main/logo_ru" : "main/logo_en",
      t = addSprite(!1, e, 240, 65),
      a = addSprite(!1, "main/main_menu_panel", 0, 140, 1, t);
    (t.opacity = 0), t.fadeTo(1, 500);
    var r = addSprite(!1, "buttons/button_6", 0, -20, 1, a);
    r.stop(),
      (r.onmousedown = setFirstFrame),
      (r.onmouseout = setZeroFrame),
      (r.onmouseup = function (e) {
        playSound("ui_button_click"),
          launchLoadScreen(function () {
            setZeroFrame(e),
              gameData.levels[0].completed ? showMap() : startLevel(0);
          });
      }),
      textFutura(0, -2, I18.f("career"), 12, r, 2);
    var o = addSprite(!1, "buttons/button_6", 0, 10, 1, a);
    if (
      (o.stop(),
      checkEndless()
        ? ((o.onmousedown = setFirstFrame),
          (o.onmouseout = setZeroFrame),
          (o.onmouseup = function (e) {
            launchLoadScreen(function () {
              playSound("ui_button_click"),
                setZeroFrame(e),
                startEndlesslevel();
            });
          }))
        : o.gotoAndStop(3),
      textFutura(0, -2, I18.f("endless"), 12, o, 2),
      "y8" === ExternalAPI.type)
    ) {
      var n = addSprite(!1, "buttons/button_6", 0, 40, 1, a);
      n.stop(),
        (n.onmousedown = setFirstFrame),
        (n.onmouseout = setZeroFrame),
        (n.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            ExternalAPI.showHighScores();
        }),
        textFutura(0, -2, I18.f("leaderboard"), 12, n, 2);
    }
    if (!ExternalAPI.exec("getMoreGamesButtonDisable")) {
      (r.y -= 20), (o.y -= 28);
      var h = addSprite(!1, "buttons/more_games", 0, 35, 1, a);
      h.addEventListener("click", showMoreGames);
    }
    var l = addSprite(!1, "buttons/button_6", -100, 100, 1, a);
    l.stop(),
      (l.onmousedown = setFirstFrame),
      (l.onmouseout = setZeroFrame),
      (l.onmouseup = function (e) {
        playSound("ui_button_click"), setZeroFrame(e), s(t);
      }),
      textFutura(0, -2, I18.f("options"), 12, l, 2);
    var l = addSprite(!1, "buttons/button_6", 100, 100, 1, a);
    l.stop(),
      (l.onmousedown = setFirstFrame),
      (l.onmouseout = setZeroFrame),
      (l.onmouseup = function (e) {
        playSound("ui_button_click"), setZeroFrame(e), showAwardsRoom();
      }),
      textFutura(0, -2, I18.f("trophies"), 12, l, 2),
      (l = addSprite(!1, "flags/" + I18.currentLocale, 164, -170, 1.3, a)),
      (l.onmouseup = function (e) {
        playSound("ui_button_click"), i(t);
      });
  }
  stopSounds(),
    playMusic("music_mainmenu"),
    addSprite(!0, "main/back_main_menu", 240, 160),
    ExternalAPI.exec("addLogo", 60, 18),
    ExternalAPI.exec("addKiz10Logo", 60, 18),
    o();
  var n = ExternalAPI.exec("showCopyright");
  n && (n.y -= 8);
}
function buildMap() {
  function e(e, t) {
    var s = stage.createTween(stage.viewport, e, stage.viewport[e], t, 500);
    s.play();
    var i = "x" == e ? 2 * t : 0,
      a = "y" == e ? 2 * t : 0;
    v.moveBy(i, a, 500);
  }
  function t(e) {
    (i = e.x + e.target.x), (a = e.y + e.target.y);
  }
  function s(t) {
    (i -= t.x + t.target.x),
      (a -= t.y + t.target.y),
      (Math.abs(i) < 50 && Math.abs(a) < 50) ||
        (Math.abs(i) >= Math.abs(a)
          ? (i > 0 && -160 == stage.viewport.x && e("x", 160),
            0 > i && 160 == stage.viewport.x && e("x", -160))
          : (a > 0 && -140 == stage.viewport.y && e("y", 140),
            0 > a && 140 == stage.viewport.y && e("y", -140)));
  }
  stopSounds(), playMusic("music_game");
  var i, a;
  getAccesses();
  var r = addSprite(!1, "backs/back_lvlmap_complete", 240, 160);
  (r.onmousedown = t),
    (r.onmouseup = s),
    (stage.viewport.x = -160),
    (stage.viewport.y = 140);
  var o =
    ExternalAPI.exec("addLogo", -r.width / 2 + 60, -r.height / 2 + 20, !0, r) ||
    ExternalAPI.exec("addKiz10Logo", -r.width / 2 + 60, -r.height / 2 + 20, r);
  o && (o.ignoreViewport = !0);
  for (var n, h = {}, l = 0; l < accesses.length; l++) {
    var p = config.Map.NodesPosition["p" + accesses[l]];
    n = "map/node_new";
    var d = accesses[l];
    if (
      config.LevelsRecords.record[d].Accessibility &&
      config.LevelsRecords.record[d].Accessibility.c
    ) {
      var c = [];
      if (config.LevelsRecords.record[d].Accessibility.c.length)
        for (
          var u = 0;
          u < config.LevelsRecords.record[d].Accessibility.c.length;
          u++
        )
          c.push(config.LevelsRecords.record[d].Accessibility.c[u]);
      else c.push(config.LevelsRecords.record[d].Accessibility.c);
      for (var g = !0, u = 0; u < c.length; u++)
        gameData.upgrades[c[u].CritID + 7] < c[u].Value && (g = !1);
      g || (n = "map/node_stop");
    }
    gameData.levels[accesses[l]].completed && (n = "map/node_complete"),
      gameData.levels[accesses[l]].silver && (n = "map/node_silver"),
      gameData.levels[accesses[l]].gold && (n = "map/node_gold");
    var f = addSprite(!1, n, p[0] - 160, p[1] - 140);
    (f.id = accesses[l]),
      1 == f.id && createHint(5, 8, stage, f.x, f.y - 75, !0, 5, -10, !0),
      f.stop(),
      ("map/node_stop" != n && "map/node_new" != n) ||
        ("map/node_stop" == n && (f.denied = !0), fadeIn(f)),
      "map/node_stop" == n &&
        ((f.denied = !0),
        createHint(13, 8, stage, f.x, f.y - 75, !0, 5, -30, !0)),
      l == gameData.last && ((h.x = f.x + 160), (h.y = f.y + 140)),
      (f.onmousedown = setFirstFrame),
      (f.onmouseout = setZeroFrame),
      (f.onmouseup = function (e) {
        return (
          hint && ((hint.destroy = !0), (hint = {})),
          playSound("ui_button_click"),
          160 == Math.abs(stage.viewport.x) &&
          140 == Math.abs(stage.viewport.y) &&
          Math.abs(i - e.target.x) < 50 &&
          Math.abs(a - e.target.y) < 50
            ? (e.target.denied
                ? showShop()
                : (setZeroFrame(e), startLevel(e.target.id)),
              !1)
            : void 0
        );
      });
  }
  if (h.x) {
    var m = [];
    (m[0] = Math.sqrt((200 - h.x) * (200 - h.x) + (150 - h.y) * (150 - h.y))),
      (m[1] = Math.sqrt((600 - h.x) * (600 - h.x) + (150 - h.y) * (150 - h.y))),
      (m[2] = Math.sqrt((200 - h.x) * (200 - h.x) + (450 - h.y) * (450 - h.y))),
      (m[3] = Math.sqrt((600 - h.x) * (600 - h.x) + (450 - h.y) * (450 - h.y)));
    for (var y = 1e4, x = 0, l = 0; l < m.length; l++)
      m[l] < y && ((y = m[l]), (x = l));
    switch (x) {
      case 0:
        (stage.viewport.x = -160), (stage.viewport.y = -140);
        break;
      case 1:
        (stage.viewport.x = 160), (stage.viewport.y = -140);
        break;
      case 2:
        (stage.viewport.x = -160), (stage.viewport.y = 140);
        break;
      case 3:
        (stage.viewport.x = 160), (stage.viewport.y = 140);
    }
  }
  var v = addSprite(
    !1,
    "ui_level/menu_onlevel2",
    240 + stage.viewport.x,
    307 + stage.viewport.y
  );
  v.onmouseup = function (e) {
    return !1;
  };
  var f = addSprite(!1, "buttons/button_4", -212, 0, 1, v);
  f.stop(),
    (f.onmousedown = setFirstFrame),
    (f.onmouseout = setZeroFrame),
    (f.onmouseup = function (e) {
      playSound("ui_button_click"),
        hint && ((hint.destroy = !0), (hint = {})),
        setZeroFrame(e),
        showShop();
    }),
    textFutura(0, -1, I18.f("shop"), 10, f, 2);
  var f = addSprite(!1, "buttons/button_3", 218, 0, 1, v);
  f.stop(),
    (f.onmousedown = setFirstFrame),
    (f.onmouseout = setZeroFrame),
    (f.onmouseup = function (e) {
      playSound("ui_button_click"),
        hint && ((hint.destroy = !0), (hint = {})),
        setZeroFrame(e),
        showMenu();
    }),
    textFutura(0, -1, I18.f("menu"), 10, f, 2);
  var f = addSprite(!1, "buttons/btn_big_screen", 218, -30, 1, v);
  if (
    (f.stop(),
    (f.onmousedown = setFirstFrame),
    (f.onmouseout = setZeroFrame),
    (f.onmouseup = changeScreen),
    !ExternalAPI.exec("getMoreGamesButtonDisable"))
  ) {
    var w = addSprite(!1, "buttons/more_games", -212, -40, 1, v);
    w.addEventListener("click", showMoreGames);
  }
}
function showAward(e) {
  var t = addSprite(!1, "awards/back_new_award", 240, 160),
    s = addSprite(!1, "awards/award" + e, 0, -40, 1, t);
  (s.animDelay = 3),
    (s.onchangeframe = function (e) {
      e.target.currentFrameX == e.target.framesCount - 1 && e.target.stop();
    }),
    writeFontWhite2(I18.f(getAwardName(e) + "_received"), 0, 35, 0.9, t, 2);
  var s = addSprite(!1, "buttons/button_6", 0, 90, 1, t);
  s.stop(),
    (s.onmousedown = setFirstFrame),
    (s.onmouseout = setZeroFrame),
    (s.onmouseup = function (e) {
      return (
        playSound("ui_button_click"), setZeroFrame(e), (t.destroy = !0), !1
      );
    }),
    textFutura(0, -1, I18.f("ok"), 10, s, 2),
    saveGameData(gameData);
}
function addAwardIcon(e) {
  var t, s;
  switch (e) {
    case 0:
      (t = 161), (s = 252);
      break;
    case 1:
      (t = 332), (s = 252);
      break;
    case 2:
      (t = 243), (s = 139);
      break;
    case 3:
      (t = 46), (s = 64);
      break;
    case 4:
      (t = 432), (s = 60);
      break;
    case 5:
      (t = 237), (s = 238);
      break;
    case 6:
      (t = 46), (s = 246);
      break;
    case 7:
      (t = 417), (s = 253);
      break;
    case 8:
      (t = 340.5), (s = 165);
      break;
    case 9:
      (t = 53), (s = 152);
      break;
    case 10:
      (t = 448), (s = 155);
      break;
    case 11:
      (t = 105), (s = 217);
      break;
    case 12:
      (t = 111), (s = 58);
      break;
    case 13:
      (t = 307), (s = 78);
      break;
    case 14:
      (t = 369), (s = 51);
      break;
    case 15:
      (t = 110), (s = 139);
      break;
    case 16:
      (t = 391), (s = 138);
      break;
    case 17:
      (t = 169), (s = 152);
      break;
    case 18:
      (t = 186), (s = 69);
      break;
    default:
      (t = 240), (s = 160);
  }
  var i;
  (i = addSprite(!1, "awards/award_light" + e, t, s)),
    (i.name = getAwardName(e)),
    (i.id = e),
    (i.onmouseup = function (e) {
      if (e.target.x < 75) var t = 75;
      else if (e.target.x > 405) var t = 405;
      else var t = e.target.x;
      (hintAward = addSprite(!1, "help/tips_simple", t, e.target.y)),
        writeFontWhite2(I18.f(e.target.name), 0, 0, 1, hintAward, 2);
    });
}
function checkEndless() {
  for (var e = !1, t = 0, s = 0; s < gameData.levels.length; s++)
    gameData.levels[s].completed && t++;
  return t >= Math.floor(gameData.levels.length / 2) && (e = !0), e;
}
function fadeIn(e) {
  e.fadeTo(0, 1e3, null, function (e) {
    fadeOut(e.target.obj);
  });
}
function fadeOut(e) {
  e.fadeTo(1, 1e3);
}
function setAccesses() {
  (config.accessDepot = gameData.upgrades[4]),
    (config.accessDriedEggsHouse = gameData.upgrades[7]),
    (config.accessButterHouse = gameData.upgrades[14]),
    (config.accessCakeHouse = gameData.upgrades[8]),
    (config.accessCarnivalDressHouse = gameData.upgrades[18]),
    (config.accessCheeseHouse = gameData.upgrades[15]),
    (config.accessFanHouse = gameData.upgrades[16]),
    (config.accessFlouryCakeHouse = gameData.upgrades[9]),
    (config.accessMeatHouse = gameData.upgrades[10]),
    (config.accessMeatPacketHouse = gameData.upgrades[12]),
    (config.accessMeatSpiceHouse = gameData.upgrades[11]),
    (config.accessPlumedHatHouse = gameData.upgrades[17]),
    (config.accessSourCreamHouse = gameData.upgrades[13]),
    (config.accessWell = gameData.upgrades[3]),
    (config.accessCar = gameData.upgrades[5]),
    (config.accessAvia = gameData.upgrades[6]),
    (config.accessCage = gameData.upgrades[0]),
    (config.accessDog = gameData.upgrades[2]);
}
function toggleSound(e) {
  playSound("ui_button_click"),
    (soundOn = !soundOn),
    (gameData.sound = soundOn),
    saveGameData(gameData);
  var t = soundOn ? 0 : 1;
  return e.target.gotoAndStop(t), !1;
}
function toggleMusic(e) {
  playSound("ui_button_click"),
    (musicOn = !musicOn),
    musicOn
      ? (gameState == STATE_MENU && playMusic("music_mainmenu"),
        gameState == STATE_GAME && playMusic("music_game"))
      : playingMusic && playingMusic.stop(),
    (gameData.music = musicOn),
    saveGameData(gameData);
  var t = musicOn ? 0 : 1;
  e.target.gotoAndStop(t);
}
function playSound(e, t) {
  var s = t || !1;
  if (soundOn) {
    var i = mixer.play(e, s);
    return i;
  }
}
function playMusic(e) {
  musicOn &&
    ((playingMusic = mixer.play(e, !0, !0, 0)),
    (playingMusic.track = e),
    (playingMusic.locked = !0));
}
function createHint(e, t, s, i, a, r, o, n, h, l, p) {
  if (!gameData.hints[e] && !hint.active) {
    var d = i ? i : 0,
      c = a ? a : 0;
    s && ((d += s.x), (c += s.y));
    var u,
      g,
      f = null;
    switch (e) {
      case 0:
        u = "hint_goose";
        break;
      case 1:
        u = "hint_grass_grow";
        break;
      case 2:
        u = "hint_goose_buy";
        break;
      case 3:
        u = "hint_egg";
        break;
      case 4:
        u = "hint_goals";
        break;
      case 5:
        u = "hint_level_map";
        break;
      case 6:
        u = "hint_car";
        break;
      case 7:
        u = "hint_well";
        break;
      case 8:
        u = "hint_bear";
        break;
      case 9:
        u = "hint_bear_click";
        break;
      case 10:
        u = "hint_depot";
        break;
      case 11:
        u = "hint_depot_button_1";
        break;
      case 12:
        u = "hint_depot_button_all";
        break;
      case 13:
        u = "hint_level_map_shop";
        break;
      case 14:
        u = "hint_level_map_shop_inside";
        break;
      case 15:
        u = "hint_level_map_blue_bottom";
        break;
      case 16:
        u = "hint_buy_building";
        break;
      case 17:
        u = "hint_dried_egg_house";
        break;
      case 18:
        u = "hint_building_produce";
        break;
      case 19:
        u = "hint_depot_full";
        break;
      case 20:
        u = "hint_button_upgrade";
        break;
      case 21:
        u = "hint_cake_house";
        break;
      case 22:
        u = "hint_spinnery";
        break;
      case 23:
        u = "hint_cow";
        break;
      case 24:
        u = "hint_cat";
        break;
      case 25:
        u = "hint_butter_house";
        break;
      case 26:
        u = "hint_sheep";
        break;
      case 27:
        u = "hint_dog";
        break;
      case 28:
        u = "hint_cheese_house";
        break;
      case 29:
        u = "hint_textile_house";
        break;
      case 30:
        u = "hint_no_money";
        break;
      case 31:
        u = "hint_bear_cage";
        break;
      case 32:
        u = "hint_product";
        break;
      case 33:
        u = "hint_airplane";
        break;
      case 34:
        u = "hint_level_5_1";
        break;
      case 35:
        u = "hint_level_5_2";
        break;
      case 36:
        (u = "hint_level_5_3"), (f = "products/powder");
    }
    switch (t) {
      case 0:
        g = "water_tip";
        break;
      case 1:
        g = "tips_block";
        break;
      case 2:
        g = "tips_main";
        break;
      case 3:
        g = "tips_main1";
        break;
      case 4:
        g = "tips_map0";
        break;
      case 5:
        g = "tips_map1";
        break;
      case 6:
        g = "tips_map2";
        break;
      case 7:
        g = "tips_simple";
        break;
      case 8:
        g = "tips_simple_down";
        break;
      case 9:
        g = "tips_simple_left";
        break;
      case 10:
        g = "tips_simple_right";
        break;
      case 11:
        g = "tips_simple_up";
    }
    (hint = addSprite(!1, "help/" + g, d, c)),
      (hint.id = e),
      (hint.scaleX = l ? l : 1),
      (hint.scaleY = p ? p : 1),
      (hint.active = !0),
      (gameData.hints[hint.id] = !0),
      saveGameData(gameData),
      r ? (hint.pause = !0) : field.setPause(),
      h && (hint.noAction = !0);
    var m = writeFontWhite2(I18.f(u), o, n, 1, hint, 1);
    (m.scale = -1 == l || -1 == p ? -1 : 1),
      f && ((m = addSprite(!1, f, 0, 20, 1, hint)), m.stop());
  }
}
function startEndlesslevel() {
  startLevel(100, !0),
    ExternalAPI.exec("addLogo", stage.screenWidth / 2 + 12, 18, !0),
    ExternalAPI.exec("addKiz10Logo", stage.screenWidth / 2 + 12, 18);
}
function startLevel(e, t) {
  return assets.length > 0
    ? loadMoreAssets(function () {
        startLevel(e, t);
      })
    : (isLocked(e) ? showUnlock(e) : startUnlockedLevel(e, t),
      ExternalAPI.exec("addLogo", stage.screenWidth / 2 + 12, 18, !0),
      void ExternalAPI.exec("addKiz10Logo", stage.screenWidth / 2 + 12, 18));
}
function startUnlockedLevel(e, t) {
  (gameState = STATE_GAME),
    createStage(),
    stopSounds(),
    playMusic("music_game"),
    (curLevel = e),
    (depot = {}),
    (landCheck = !1),
    convertBuildingPlaces(),
    (field = new GameField(e)),
    t && (createEndlessGoals(), (field.endless = !0)),
    field.addGoals(),
    field.addUI(),
    field.addStartPlaces(),
    field.addMiniMap(),
    field.addDepot(),
    field.addWell(0),
    field.addBigCar(0),
    field.addBigAvia(0),
    field.addBearsArray(),
    t || showStartGoal(),
    stage.start(),
    stage.refreshBackground(),
    ExternalAPI.exec("levelStarted");
}
function createEndlessGoals() {
  goals = [];
  for (var e = 0; 90 > e; e++) {
    var t = config.LevelsRecords.record[e],
      s = {};
    if (t.Goals.goal.length)
      for (var i = 0; i < t.Goals.goal.length; i++)
        (s.Type = t.Goals.goal[i].Type),
          (s.Val = t.Goals.goal[i].Val),
          (s.EndlessStars = t.Goals.goal[i].EndlessStars),
          goals.push(s);
    else
      (s.Type = t.Goals.goal.Type),
        (s.Val = t.Goals.goal.Val),
        (s.EndlessStars = t.Goals.goal.EndlessStars),
        goals.push(s);
  }
}
function stopSounds() {
  for (var e = 0; 5 > e; e++) mixer.channels[e].stop();
}
function showWin() {
  function e(e, t, s, a) {
    var r = 0.05 * e,
      o = stage.createTween(null, r, e, t, s, null);
    (o.onchange = function (e) {
      a.write(convertTime(Math.floor(e.target.prop)));
    }),
      o.play(),
      (o.onfinish = function () {
        1 == field.goal &&
          (addSprite(!1, "ui_level/complete_gold_cup", 62, -35, 0.9, i),
          textFutura(
            62,
            15,
            I18.f("level_end_gold"),
            12,
            i,
            2,
            null,
            "#FFFF00",
            "#FFFF00"
          ),
          playSound("fanfare_medal")),
          2 == field.goal &&
            (addSprite(!1, "ui_level/complete_silver_cup", 62, -35, 0.9, i),
            textFutura(
              62,
              15,
              I18.f("level_end_silver"),
              12,
              i,
              2,
              null,
              "#FFFF00",
              "#FFFF00"
            ),
            playSound("fanfare_medal"));
      });
  }
  function t(t, s, i, a, r) {
    var o = 0.05 * t,
      n = stage.createTween(null, o, t, s, i, null);
    (n.onchange = function (e) {
      a.write(Math.floor(e.target.prop));
    }),
      n.play(),
      r &&
        (n.onfinish = function () {
          e(Math.floor(field.timeReal), 0, 2e3, h);
        });
  }
  field.setPause(),
    playingMusic && playingMusic.stop(),
    stopSounds(),
    playSound("fanfare_level_complete");
  var s,
    i = addSprite(!1, "ui_level/level_complete", 240, 160),
    a = config.LevelsRecords.record[field.curLevel],
    r = a.Prize;
  1 == field.goal && (r += a.GoldPrize),
    2 == field.goal && (r += a.SilverPrize);
  var o = (gameData.bank += money);
  field.petsLost || (gameData.levels[field.curLevel].noPetsLost = !0),
    field.menuButton.gotoAndStop(3),
    (field.menuButton.onmousedown = null),
    (field.menuButton.onmouseout = null),
    (field.menuButton.onmouseup = null),
    textBold(
      0,
      -110,
      I18.f("level_end_results"),
      20,
      i,
      2,
      "bold",
      "#8B4513",
      null,
      0.5
    ),
    addSprite(!1, "ui_level/gold_coin", -80, -70, 1, i),
    textFutura(-45, -70, I18.f("level_end_coins"), 12, i, 2);
  var n = numbersGold(money, 20, -68, 1, i, 1, -2);
  addSprite(!1, "ui_level/anim_clock", -80, -40, 1, i),
    textFutura(-45, -40, I18.f("level_end_time"), 12, i, 2);
  var h = numbersGold(
    convertTime(Math.floor(field.timeReal)),
    20,
    -38,
    1,
    i,
    1,
    -2
  );
  addSprite(!1, "ui_level/menu_star", -80, -10, 1, i),
    textFutura(-45, -10, I18.f("level_end_bonus"), 12, i, 2);
  numbersGold(r, 20, -8, 1, i, 1, -2);
  addSprite(!1, "depot/depot_menu_coin1", -80, 20, 1, i),
    textFutura(-45, 20, I18.f("level_end_bank"), 12, i, 2);
  var l = numbersGold(o, 20, 22, 1, i, 1, -2);
  t(money, 0, 2e3, n),
    t(o - money, o, 2e3, l, !0),
    1 == field.goal && (gameData.levels[field.curLevel].gold = !0),
    2 == field.goal && (gameData.levels[field.curLevel].silver = !0),
    gameData.levels[field.curLevel].bestTime > Math.floor(field.timeReal) &&
      (gameData.levels[field.curLevel].bestTime = Math.floor(field.timeReal)),
    (gameData.levels[field.curLevel].completed = !0),
    (s = addSprite(!1, "buttons/button_5", 0, 90, 1, i)),
    s.stop(),
    (s.onmousedown = setFirstFrame),
    (s.onmouseout = setZeroFrame),
    (s.onmouseup = function (e) {
      return playSound("ui_button_click"), showMap(), !1;
    }),
    textFutura(0, -1, I18.f("ok"), 10, s, 2),
    (gameData.stars += r),
    (gameData.totalStars += r),
    (gameData.last = field.curLevel),
    saveGameData(gameData),
    checkAwards(),
    ExternalAPI.exec("showAds"),
    ExternalAPI.exec("submitScores", gameData.totalStars),
    ExternalAPI.exec("levelEnded", {
      score: gameData.totalStars,
      level: gameData.last,
    });
}
function checkAwards() {
  function e(e) {
    (gameData.awards[e] = !0), (t = e);
  }
  for (var t = -1, s = 0, i = 0; 90 > i; i++)
    gameData.levels[i].completed && s++;
  s != gameData.levels.length || gameData.awards[0] || e(0);
  for (var a = 0, i = 0; 90 > i; i++) gameData.levels[i].gold && a++;
  a != gameData.levels.length || gameData.awards[1] || e(1);
  for (var r = 0, i = 0; 19 > i; i++) gameData.awards[i] && r++;
  r != gameData.awards.length - 1 || gameData.awards[2] || e(2);
  for (var o = 0, i = 0; 19 > i; i++) gameData.gags[i] && o++;
  o != gameData.gags.length || gameData.awards[3] || e(3);
  for (var n = 0, i = 0; 20 > i; i++)
    ((7 > i && 3 == gameData.upgrades[i]) ||
      (i >= 7 && 5 == gameData.upgrades[i])) &&
      n++;
  n != gameData.upgrades.length || gameData.awards[4] || e(4),
    field && field.timeReal >= 1800 && !gameData.awards[5] && e(5);
  for (var h = 0, i = 0; 90 > i; i++) gameData.levels[i].noPetsLost && h++;
  h >= 10 && !gameData.awards[6] && e(6);
  for (var l = 0, i = 0; i < depot.p.length; i++) depot.p[i] > 0 && l++;
  for (var i = 0; i < field.petsNum.length; i++) field.petsNum[i] > 0 && l++;
  l != depot.p.length + field.petsNum.length || gameData.awards[7] || e(7),
    field.withoutClick && !gameData.awards[8] && e(8);
  var p = !0;
  if (field.bearsArray.length > 0)
    for (var i = 0; i < field.bearsArray.length; i++)
      field.bearsArray[i].activated || (p = !1);
  if (field.bears.length > 0)
    for (var i = 0; i < field.bears.length; i++)
      field.bearsArray[i].captured || (p = !1);
  if (
    (field.bearsArray.length > 0 &&
      p &&
      field.withoutBearClick &&
      !gameData.awards[9] &&
      e(9),
    field.noHintArrow && !gameData.awards[10] && e(10),
    gameData.bank >= 1e6 && !gameData.awards[11] && e(11),
    field.endless)
  ) {
    for (var d = !0, i = 0; i < field.starButtons.length; i++)
      field.starButtons[i].visible && (d = !1);
    d && !gameData.awards[12] && e(12);
  }
  field.endless &&
    field.noHouseDestroyTimer <= 0 &&
    !gameData.awards[13] &&
    e(13),
    field.endless && field.noPetKillTimer <= 0 && !gameData.awards[14] && e(14),
    1 != field.goal || gameData.awards[15] || e(15),
    gameData.prodCount >= 300 && !gameData.awards[16] && e(16),
    gameData.parashutes >= 7 && !gameData.awards[17] && e(17),
    gameData.destroyedHouses >= 2 && !gameData.awards[18] && e(18),
    t >= 0 && showAward(t);
}
function showStartGoal() {
  field.setPause(),
    field.menuButton.gotoAndStop(3),
    (field.menuButton.onmousedown = null),
    (field.menuButton.onmouseout = null),
    (field.menuButton.onmouseup = null);
  var e,
    t = addSprite(!1, "ui_level/goal_start", 240, 160),
    s = config.LevelsRecords.record[field.curLevel];
  textBold(
    0,
    -80,
    I18.f("purpose_level"),
    20,
    t,
    2,
    "bold",
    "#8B4513",
    null,
    0.5
  ),
    textFutura(
      -47,
      -42,
      I18.f("to_collect"),
      11,
      t,
      2,
      null,
      "#FFFF00",
      "#FFFF00"
    );
  var i = "de" == I18.currentLocale ? 8 : 11;
  textFutura(
    38,
    -42,
    I18.f("for_passage"),
    i,
    t,
    2,
    null,
    "#FFFF00",
    "#FFFF00"
  ),
    addSprite(!1, "ui_level/menu_star", 60, -21, 1, t),
    numbersSilver(s.Prize, 35, -21, 1, t, 2, -2),
    addSprite(!1, "ui_level/goal_gold", 20, 15, 1, t),
    numbersGold(convertTime(s.GoldTime), 20, 18, 0.9, t, 2, -2),
    addSprite(!1, "ui_level/menu_star", 65, 20, 0.9, t),
    numbersGold(s.GoldPrize, 65, 7, 1, t, 2, -2),
    addSprite(!1, "ui_level/goal_silver", 20, 45, 1, t),
    numbersSilver(convertTime(s.SilverTime), 20, 48, 0.9, t, 2, -2),
    addSprite(!1, "ui_level/menu_star", 65, 50, 0.9, t),
    numbersSilver(s.SilverPrize, 65, 37, 1, t, 2, -2),
    (e = addSprite(!1, "buttons/button_5", 0, 90, 1, t)),
    e.stop(),
    (e.onmousedown = setFirstFrame),
    (e.onmouseout = setZeroFrame),
    (e.onmouseup = function (e) {
      field.menuButton.gotoAndStop(0),
        (field.menuButton.onmousedown = setFirstFrame),
        (field.menuButton.onmouseout = setZeroFrame),
        (field.menuButton.onmouseup = function (e) {
          playSound("ui_button_click"), setZeroFrame(e), field.showPause();
        }),
        playSound("ui_button_click"),
        removeMenu(t, field.unsetPause);
    }),
    textFutura(0, -1, I18.f("ok"), 10, e, 2);
  for (var a = 0; a < field.toGoals.length; a++)
    addSprite(!1, field.toGoals[a].name, -63, -22 + 25 * a, 1, t),
      numbersSilver(field.toGoals[a].max, -33, -20 + 25 * a, 1, t, 2, -2);
}
function removeMenu(e, t) {
  e.fadeTo(0, 500, null, function (e) {
    (e.target.obj.destroy = !0), t();
  });
}
function getAccesses() {
  accesses = [0];
  for (var e = 0; e < gameData.levels.length; e++)
    if (gameData.levels[e].completed)
      for (var t = 0; 89 > t; t++)
        config.Map.Arcs["arc" + t].n0 == e &&
          accesses.push(config.Map.Arcs["arc" + t].n1);
  for (var e = 0; e < accesses.length; e++) {
    var s = config.LevelsRecords.record[accesses[e]];
    if (s.Accessibility && s.Accessibility.c)
      if (s.Accessibility.c.length)
        for (var t = 0; t < s.Accessibility.c.length; t++) {
          var i = s.Accessibility.c[t];
          gameData.accessHouses[i.CritID] < i.Value &&
            (gameData.accessHouses[i.CritID] = i.Value);
        }
      else {
        var i = s.Accessibility.c;
        gameData.accessHouses[i.CritID] < i.Value &&
          (gameData.accessHouses[i.CritID] = i.Value);
      }
  }
}
function convertBuildingPlaces() {
  for (var e = 0; 6 > e; e++) {
    places[e] = [];
    for (var t = 0; 4 > t; t++)
      (places[e][t] = {}),
        (places[e][t].x =
          config.Game.BuildingPlaces["p" + e]["BordPos" + t][0]),
        (places[e][t].y =
          config.Game.BuildingPlaces["p" + e]["BordPos" + t][1]);
  }
}
function addBuildingPlace(e) {
  addSprite(
    !0,
    "backs/place" + (e + 1),
    0.6 * config.Game.BuildingPlaces["p" + e].position[0],
    0.533 * config.Game.BuildingPlaces["p" + e].position[1]
  );
}
function setText(e, t, s, i, a) {
  var r = new Graphics.text(s, i, t);
  for (var o in a) r[o] = a[o];
  return e.addChild(r), r;
}
function writeFontWhite2(e, t, s, i, a, r, o) {
  var n = new BitmapText(library.getBitmap("fonts/font_white2"), font_white2);
  return (
    a && (n.parent = a),
    (n.x = t),
    (n.y = s),
    (n.charSpacing = r ? r : 0),
    (n.lineSpacing = o ? o : 0),
    (n.scale = i),
    (n.scale /= 4),
    (n.align = BitmapText.ALIGN_CENTER),
    n.write(e),
    n
  );
}
function textFutura(e, t, s, i, a, r, o, n, h, l) {
  var p = new Graphics.text(e, t, s);
  return (
    (p.size = i),
    (p.style = o ? o : "normal"),
    (p.font = "a_futuraround"),
    a && a.addChild(p),
    0 == r
      ? (p.align = "left")
      : 1 == r
      ? (p.align = "right")
      : (p.align = "center"),
    (p.lineWidth = l ? l : 0.01),
    (p.color = n ? n : "#FFF"),
    (p.fillColor = h ? h : "#FFF"),
    p
  );
}
function textBold(e, t, s, i, a, r, o, n, h, l) {
  var p = new Graphics.text(e, t, s);
  (p.size = i),
    (p.style = o ? o : "normal"),
    (p.font = "bold"),
    a && a.addChild(p),
    0 == r
      ? (p.align = "left")
      : 1 == r
      ? (p.align = "right")
      : (p.align = "center"),
    (p.lineWidth = l ? l : 0.8),
    (p.color = n ? n : "#FFF"),
    (p.fillColor = h ? h : "#FFF");
}
function textDemi(e, t, s, i, a, r, o, n, h, l) {
  var p = new Graphics.text(e, t, s);
  (p.size = i),
    (p.style = o ? o : "normal"),
    (p.font = "demi"),
    a && a.addChild(p),
    0 == r
      ? (p.align = "left")
      : 1 == r
      ? (p.align = "right")
      : (p.align = "center"),
    (p.lineWidth = l ? l : 1),
    (p.color = n ? n : "#FFF"),
    (p.fillColor = h ? h : "#FFF");
}
function textGoose(e, t, s, i, a, r, o, n, h, l) {
  var p = new Graphics.text(e, t, s);
  (p.size = i),
    (p.style = o ? o : "normal"),
    (p.font = "ds_goose"),
    a && a.addChild(p),
    0 == r
      ? (p.align = "left")
      : 1 == r
      ? (p.align = "right")
      : (p.align = "center"),
    (p.lineWidth = l ? l : 0.01),
    (p.color = n ? n : "#FFF"),
    (p.fillColor = h ? h : "#FFF");
}
function numbersGold(e, t, s, i, a, r) {
  var o = new SimpleText(library.getBitmap("misc/numbers_gold"), 8, 10);
  return (
    (o.charMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", ":"]),
    0 == r
      ? (o.align = o.ALIGN_LEFT)
      : 1 == r
      ? (o.align = o.ALIGN_RIGHT)
      : (o.align = o.ALIGN_CENTER),
    a ? (o.parent = a) : (o.parent = stage),
    (o.scale = i),
    (o.charSpacing = -2),
    (o.x = t),
    (o.y = s),
    o.write(e),
    o
  );
}
function numbersDepot(e, t, s, i, a, r) {
  var o = new SimpleText(library.getBitmap("depot/depot_menu_numbers"), 6, 8);
  return (
    (o.charMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"]),
    0 == r
      ? (o.align = o.ALIGN_LEFT)
      : 1 == r
      ? (o.align = o.ALIGN_RIGHT)
      : (o.align = o.ALIGN_CENTER),
    a ? (o.parent = a) : (o.parent = stage),
    (o.scale = i),
    (o.charSpacing = -1),
    (o.x = t),
    (o.y = s),
    o.write(e),
    o
  );
}
function numbersSilver(e, t, s, i, a, r, o) {
  var n = new SimpleText(library.getBitmap("misc/numbers_silver"), 8, 10);
  return (
    (n.charMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", ":"]),
    0 == r
      ? (n.align = n.ALIGN_LEFT)
      : 1 == r
      ? (n.align = n.ALIGN_RIGHT)
      : (n.align = n.ALIGN_CENTER),
    a ? (n.parent = a) : (n.parent = stage),
    (n.scale = i),
    (n.charSpacing = o ? o : -5),
    (n.x = t),
    (n.y = s),
    n.write(e),
    n
  );
}
function numbersShop(e, t, s, i, a, r, o) {
  var n = new SimpleText(library.getBitmap("shop/shop_numbers"), 12, 16);
  return (
    (n.charMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"]),
    0 == r
      ? (n.align = n.ALIGN_LEFT)
      : 1 == r
      ? (n.align = n.ALIGN_RIGHT)
      : (n.align = n.ALIGN_CENTER),
    a ? (n.parent = a) : (n.parent = stage),
    (n.scale = i),
    (n.charSpacing = o ? o : -3),
    (n.x = t),
    (n.y = s),
    n.write(e),
    n
  );
}
function convertTime(e) {
  var t = "",
    s = "",
    i = "",
    a = Math.floor(e / 60),
    r = e % 60;
  return (
    (s = 10 > a ? "0" + a : a), (i = 10 > r ? "0" + r : r), (t = s + ":" + i)
  );
}
function addStars(e) {
  gameData.stars + e < 0 || ((gameData.stars += e), saveGameData(gameData));
}
function addEndlessStars(e) {
  e > 0 && (field.totalStars += e),
    (field.stars += e),
    field.starsValue.write(field.stars);
  for (var t = 0; t < field.starButtons.length; t++)
    2 == field.starButtons[t].currentFrame &&
      field.starButtons[t].cost <= field.stars &&
      field.starButtons[t].gotoAndStop(0);
}
function addMoney(e) {
  if (((money += e), field.money > 0 && e > 0 && field.money <= money)) {
    (field.money = 0), playSound("fanfare_aim");
    for (var t = 0; t < field.toGoals.length; t++)
      for (var s in field.toGoals[t])
        if ("money" == s)
          if (((field.toGoals[t].destroy = !0), field.endless))
            addEndlessStars(field.toGoals[t].endlessStars),
              field.addEndlessGoal(t);
          else {
            var i = addSprite(
              !1,
              "ui_level/gold_coin",
              field.toGoals[t].x,
              field.toGoals[t].y,
              0.8
            );
            i.setZIndex(5e3),
              i.gotoAndStop(3),
              addSprite(!1, "ui_level/goal_done", 0, 20, 0.8, i);
          }
  }
  for (var t = 0; t < field.petButtons.length; t++)
    3 == field.petButtons[t].currentFrame &&
      field.petButtons[t].cost <= money &&
      field.petButtons[t].gotoAndStop(0),
      field.petButtons[t].cost > money && field.petButtons[t].gotoAndStop(3);
  for (var t = 0; t < field.upButtons.length; t++)
    2 == field.upButtons[t].currentFrame &&
      field.upButtons[t].cost <= money &&
      field.upButtons[t].gotoAndStop(0);
}
function getGameDataId() {
  return "playtomax_" + GAME_ID + "_data";
}
function saveGameData(e) {
  var t = JSON.stringify(gameData);
  "y8" === ExternalAPI.type && ExternalAPI.submitScore(gameData.totalStars),
    ExternalAPI.externalStorage && ExternalAPI.userId
      ? ExternalAPI.exec("store", "save", { data: t })
      : ExternalAPI.externalStorage
      ? ExternalAPI.exec("saveUserData", gameData)
      : ExternalAPI.exec("getStorageSupport")
      ? ExternalAPI.exec("saveGameData", t)
      : Utils.setCookie(getGameDataId(), t);
}
function showMoreGames() {
  if (!ExternalAPI.exec("customMoreGames")) {
    var e = ExternalAPI.exec("getMoreGamesURL");
    e && window.open(e, "_blank");
  }
}
function preTick(e) {
  (gameState == STATE_MAP ||
    (gameState == STATE_GAME && field && !field.pause)) &&
    ((gagTimer -= e.delta),
    0 >= gagTimer && ((gagTimer = gagTimeout), addGag())),
    field && field.preTick(e.delta);
}
function postTick() {
  field && field.postTick();
}
function setZeroFrame(e) {
  e.target.gotoAndStop(0);
}
function setFirstFrame(e) {
  e.target.gotoAndStop(1);
}
function setSecondFrame(e) {
  e.target.gotoAndStop(2);
}
function setThirdFrame(e) {
  e.target.gotoAndStop(3);
}
function effectDust(e, t) {
  var s = 0 == t ? "effects/dust_house" : "effects/dust_pet",
    i = addSprite(!1, s, e.x, e.y + e.height / 4);
  i.onchangeframe = function (e) {
    e.target.currentFrame == e.target.totalFrames - 1 &&
      (e.target.destroy = !0);
  };
}
function addGag() {
  var e,
    t = [];
  if (gameState == STATE_MAP)
    for (var s = 0; 15 > s; s++)
      "MAP" != config.Gags["Gag" + s].Type || gameData.gags[s] || t.push(s);
  else
    for (var s = 0; 15 > s; s++)
      "MAP" == config.Gags["Gag" + s].Type || gameData.gags[s] || t.push(s);
  if (t.length > 0) {
    var i = random(0, t.length - 1),
      a = config.Gags["Gag" + t[i]];
    if (a.StartPos) {
      if (gameState == STATE_MAP)
        var r = a.FinishPos[0] - 160,
          o = a.FinishPos[1] + 140 * (-1 + (stage.viewport.y - 140) / 140),
          n = a.StartPos[0] - 160,
          h = a.StartPos[1] + 140 * (-1 + (stage.viewport.y - 140) / 140);
      else
        var r = 0.6 * a.FinishPos[0],
          o = 0.533 * a.FinishPos[1],
          n = 0.6 * a.StartPos[0],
          h = 0.533 * a.StartPos[1];
      (e = addSprite(!1, a.Button.Picture, n, h)),
        e.moveTo(r, o, 96e4 / a.Speed, null, function (e) {
          e.target.obj.destroy = !0;
        });
    } else {
      if (gameState == STATE_MAP)
        var r = a.Button.position[0] / 2 + stage.viewport.x,
          o = a.Button.position[1] / 2 + stage.viewport.y;
      else if (0 == a.Button.position[0] && 0 == a.Button.position[1])
        var r = 150 + random(0, 250),
          o = 130 + random(0, 100);
      else
        var r = 0.6 * a.Button.position[0],
          o = 0.533 * a.Button.position[1];
      (e = addSprite(!1, a.Button.Picture, r, o)),
        (e.animDelay = 4),
        (e.onchangeframe = function (e) {
          (e.target.currentFrameX == e.target.framesCount - 1 ||
            (!e.target.currentFrameX &&
              e.target.currentFrame == e.target.totalFrames - 1)) &&
            (e.target.destroy = !0);
        });
    }
    (e.id = t[i]),
      (e.PictureHit = addSprite(
        !1,
        a.Button.PictureHit.Picture,
        0.6 * a.Button.PictureHit.position[0],
        0.533 * a.Button.PictureHit.position[1],
        1,
        e
      )),
      (e.PictureHit.visible = !1),
      (e.onmousedown = function (e) {
        return gameData.gags[e.target.id]
          ? !1
          : (playSound("gag_hit"),
            (e.target.PictureHit.visible = !0),
            (gameData.gags[e.target.id] = !0),
            saveGameData(gameData),
            !1);
      }),
      (e.onmouseup = function () {
        return !1;
      });
  }
}
function petCost(e) {
  var t = 0;
  switch (e) {
    case 0:
      t = 50;
      break;
    case 1:
      t = 500;
      break;
    case 2:
      t = 5e3;
      break;
    case 3:
      t = 35e3;
  }
  return t;
}
function getOpeningCost(e, t) {
  var s = 0,
    i = xmlNameToUp(e);
  return (s = config.Game.EndlessMode.OpeningCosts.Item[i].c[t].cost);
}
function getAwardName(e) {
  var t = "";
  switch (e) {
    case 0:
      t = "all_levels";
      break;
    case 1:
      t = "all_levels_gold";
      break;
    case 2:
      t = "all_awards";
      break;
    case 3:
      t = "all_gags";
      break;
    case 4:
      t = "all_upgrades";
      break;
    case 5:
      t = "slowly";
      break;
    case 6:
      t = "10_levels";
      break;
    case 7:
      t = "all_depot";
      break;
    case 8:
      t = "without_click";
      break;
    case 9:
      t = "all_bears";
      break;
    case 10:
      t = "without_hint";
      break;
    case 11:
      t = "millione";
      break;
    case 12:
      t = "all_endless";
      break;
    case 13:
      t = "all_houses_endless";
      break;
    case 14:
      t = "all_animals_endless";
      break;
    case 15:
      t = "best_time";
      break;
    case 16:
      t = "300_products";
      break;
    case 17:
      t = "flying_product";
      break;
    case 18:
      t = "fast_product";
  }
  return t;
}
function convertGoal(e) {
  var t = "";
  switch (e) {
    case 0:
      t = "money";
      break;
    case 1:
      t = "egg";
      break;
    case 2:
      t = "dried_egg";
      break;
    case 3:
      t = "cake";
      break;
    case 4:
      t = "flourycake";
      break;
    case 5:
      t = "meat";
      break;
    case 6:
      t = "steak";
      break;
    case 7:
      t = "meatspice";
      break;
    case 8:
      t = "meatpacket";
      break;
    case 9:
      t = "milk";
      break;
    case 10:
      t = "sourcream";
      break;
    case 11:
      t = "butter";
      break;
    case 12:
      t = "cheese";
      break;
    case 13:
      t = "feather";
      break;
    case 14:
      t = "fan";
      break;
    case 15:
      t = "hat_feather";
      break;
    case 16:
      t = "dress";
      break;
    case 17:
      t = "chicken";
      break;
    case 18:
      t = "pig";
      break;
    case 19:
      t = "cow";
      break;
    case 20:
      t = "ostrich";
      break;
    case 21:
      t = "bear1";
      break;
    case 22:
      t = "bear2";
      break;
    case 23:
      t = "bear3";
      break;
    case 24:
      t = "bear4";
      break;
    case 25:
      t = "powder";
      break;
    case 26:
      t = "packet";
      break;
    case 27:
      t = "cheese_ferment";
      break;
    case 28:
      t = "hat";
      break;
    case 29:
      t = "textile";
  }
  return t;
}
function productNameToXmlName(e) {
  var t = "";
  switch (e) {
    case "butter":
    case 10:
      t = "Butter";
      break;
    case "cake":
    case 2:
      t = "Cake";
      break;
    case "cheese":
    case 11:
      t = "Cheese";
      break;
    case "cheese_ferment":
    case 18:
      t = "CheeseFerment";
      break;
    case "dress":
    case 15:
      t = "CarnivalDress";
      break;
    case "dried_egg":
    case 1:
      t = "DriedEggs";
      break;
    case "egg":
    case 0:
      t = "Egg";
      break;
    case "fan":
    case 13:
      t = "Fan";
      break;
    case "feather":
    case 12:
      t = "Plume";
      break;
    case "flourycake":
    case 3:
      t = "FlouryCake";
      break;
    case "hat":
    case 19:
      t = "Hat";
      break;
    case "hat_feather":
    case 14:
      t = "PlumedHat";
      break;
    case "meat":
    case 4:
      t = "Meat";
      break;
    case "meatpacket":
    case 7:
      t = "MeatPacket";
      break;
    case "meatspice":
    case 5:
      t = "MeatSirloin";
      break;
    case "milk":
    case 8:
      t = "Milk";
      break;
    case "packet":
    case 17:
      t = "MeatPack";
      break;
    case "powder":
    case 16:
      t = "Flour";
      break;
    case "sourcream":
    case 9:
      t = "SourCream";
      break;
    case "steak":
    case 6:
      t = "MeatBacon";
      break;
    case "textile":
    case 20:
      t = "Textile";
      break;
    case "bear1":
    case 21:
      t = "CagedBear1";
      break;
    case "bear2":
    case 22:
      t = "CagedBear2";
      break;
    case "bear3":
    case 23:
      t = "CagedBear3";
      break;
    case "bear4":
    case 24:
      t = "CagedBear4";
      break;
    case 25:
      t = "Chicken";
      break;
    case 26:
      t = "Pig";
      break;
    case 27:
      t = "Cow";
      break;
    case 28:
      t = "Ostrich";
  }
  return t;
}
function petToCode(e) {
  var t = 0;
  switch (e) {
    case "chicken":
      t = 0;
      break;
    case "pig":
      t = 1;
      break;
    case "cow":
      t = 2;
      break;
    case "ostrich":
      t = 3;
      break;
    default:
      t = 100;
  }
  return t;
}
function codeToPet(e) {
  var t = 0;
  switch (e) {
    case 0:
      t = "chicken";
      break;
    case 1:
      t = "pig";
      break;
    case 2:
      t = "cow";
      break;
    case 3:
      t = "ostrich";
  }
  return t;
}
function houseCodeToXmlName(e) {
  var t = "";
  switch (e) {
    case 0:
      t = "DriedEggsHouse";
      break;
    case 1:
      t = "CakeHouse";
      break;
    case 2:
      t = "FlouryCakeHouse";
      break;
    case 3:
      t = "MeatHouse";
      break;
    case 4:
      t = "MeatSpiceHouse";
      break;
    case 5:
      t = "MeatPacketHouse";
      break;
    case 6:
      t = "SourCreamHouse";
      break;
    case 7:
      t = "ButterHouse";
      break;
    case 8:
      t = "CheeseHouse";
      break;
    case 9:
      t = "FanHouse";
      break;
    case 10:
      t = "PlumedHatHouse";
      break;
    case 11:
      t = "CarnivalDressHouse";
  }
  return t;
}
function xmlNameToUp(e) {
  var t = 0;
  switch (e) {
    case "Well":
      t = 0;
      break;
    case "Depot":
      t = 1;
      break;
    case "Car":
      t = 2;
      break;
    case "Avia":
      t = 3;
      break;
    case "DriedEggsHouse":
      t = 4;
      break;
    case "CakeHouse":
      t = 5;
      break;
    case "FlouryCakeHouse":
      t = 6;
      break;
    case "MeatHouse":
      t = 7;
      break;
    case "MeatSpiceHouse":
      t = 8;
      break;
    case "MeatPacketHouse":
      t = 9;
      break;
    case "SourCreamHouse":
      t = 10;
      break;
    case "ButterHouse":
      t = 11;
      break;
    case "CheeseHouse":
      t = 12;
      break;
    case "FanHouse":
      t = 13;
      break;
    case "PlumedHatHouse":
      t = 14;
      break;
    case "CarnivalDressHouse":
      t = 15;
  }
  return t;
}
function loadXML(e) {
  var t = new XMLHttpRequest();
  t.open("GET", e, !1), t.send();
  var s = null;
  if (t.responseText)
    try {
      if (window.DOMParser) {
        var i = new DOMParser();
        s = i.parseFromString(t.responseText, "text/xml");
      } else
        (s = new ActiveXObject("Microsoft.XMLDOM")),
          (s.async = !1),
          s.loadXML(t.responseText);
    } catch (a) {}
  return s;
}
function loadConfig(e, t) {
  var s = loadXML("data/" + e + ".xml"),
    i = new classConfig(s.documentElement, t);
  return i;
}
function classConfig(e, t) {
  this.parseXML(e, t);
}
function random(e, t, s) {
  if (e && e instanceof Array) {
    var i = Math.round(random(0, e.length - 1));
    return e.length ? e[i] : void 0;
  }
  var a = Math.random();
  return void 0 === e
    ? a
    : (void 0 === t && (t = 0),
      (a *= Math.abs(e - t)),
      (a = Math.min(e, t) + a),
      s ? a : Math.round(a));
}
function addSprite(e, t, s, i, a, r, o, n, h) {
  var l = library.getSprite(t, { x: s, y: i });
  return (
    o && (l.height = o),
    n && l.setZIndex(n),
    h && (l.rotation = h),
    a && l.setPropScale(a),
    l.setStatic(e),
    r ? r.addChild(l) : stage.addChild(l),
    l
  );
}
function correctPosition(e) {
  var t = e.x <= 400 ? -1 : 1;
  e.x = 0.6 * e.x + 0.1 * t * e.width;
}
function refreshData(e) {
  e && (gameData = e);
}
function saveExternal(e) {
  e && ((gameData.unlocked = !!e.unlocked), saveGameData());
}
function isLocked(e) {
  return "synapsy" == ExternalAPI.type && !gameData.unlocked && e >= 3;
}
function showUnlock(e) {
  function t() {
    (s.destroy = !0), (i.destroy = !0);
  }
  var s = new Sprite(null, 480, 320);
  (s.fillColor = "rgba(0,0,0,0.7)"),
    s.setPosition(240 + stage.viewport.x, 160 + stage.viewport.y),
    (s.onmousedown = function () {
      return !1;
    }),
    (s.onmouseup = function () {
      return !1;
    }),
    (s.onmouseover = function () {
      return !1;
    }),
    (s.onmouseout = function () {
      return !1;
    }),
    (s.onclick = function () {
      return !1;
    }),
    stage.addChild(s);
  var i = library.getSprite("ui_level/pause_panel");
  i.setPosition(240 + stage.viewport.x, 160 + stage.viewport.y),
    stage.addChild(i),
    writeFontWhite2(I18.f("buy_game"), 0, -40, 1, i, 2);
  var a = library.getSprite("buttons/button_6");
  a.setPosition(0, 60),
    a.stop(),
    i.addChild(a),
    writeFontWhite2(I18.f("unlock"), 0, 0, 0.6, a, 2),
    (a.onclick = function () {
      ExternalAPI.exec(
        "purchase",
        { publisher_id: "unlock" },
        function () {
          t(), startLevel(e);
        },
        t
      );
    });
}
function changeScreen() {
  Utils.isFullScreenEnabled() && Utils.toggleFullScreen();
}
function loadGameData(e) {
  function t() {
    (soundOn = gameData.sound),
      (musicOn = gameData.music),
      (config.carUp = 0),
      (config.accessDepot = gameData.upgrades[4]),
      (config.accessDriedEggsHouse = gameData.upgrades[7]),
      (config.accessButterHouse = gameData.upgrades[14]),
      (config.accessCakeHouse = gameData.upgrades[8]),
      (config.accessCarnivalDressHouse = gameData.upgrades[18]),
      (config.accessCheeseHouse = gameData.upgrades[15]),
      (config.accessFanHouse = gameData.upgrades[16]),
      (config.accessFlouryCakeHouse = gameData.upgrades[9]),
      (config.accessMeatHouse = gameData.upgrades[10]),
      (config.accessMeatPacketHouse = gameData.upgrades[12]),
      (config.accessMeatSpiceHouse = gameData.upgrades[11]),
      (config.accessPlumedHatHouse = gameData.upgrades[17]),
      (config.accessSourCreamHouse = gameData.upgrades[13]),
      (config.accessWell = gameData.upgrades[3]),
      (config.accessCar = gameData.upgrades[5]),
      (config.accessAvia = gameData.upgrades[6]),
      (config.accessCage = gameData.upgrades[0]),
      (config.accessDog = gameData.upgrades[2]),
      (config.accessCat = gameData.upgrades[1]),
      e();
  }
  (gameData.unlocked = !1),
    (gameData.stars = 0),
    (gameData.totalStars = 0),
    (gameData.levels = []),
    (gameData.gags = []),
    (gameData.hints = []),
    (gameData.awards = []),
    (gameData.accessHouses = []),
    (gameData.upgrades = []),
    (gameData.bank = 0),
    (gameData.prodCount = 0),
    (gameData.parashutes = 0),
    (gameData.destroyedHouses = 0);
  for (var s = 0; 19 > s; s++) gameData.awards[s] = !1;
  for (var s = 0; 37 > s; s++) gameData.hints[s] = !1;
  for (var s = 0; 15 > s; s++) gameData.gags[s] = !1;
  for (var s = 0; 90 > s; s++)
    (gameData.levels[s] = {}),
      (gameData.levels[s].bestTime = 0),
      (gameData.levels[s].completed = !1),
      (gameData.levels[s].noPetsLost = !1),
      (gameData.levels[s].noBearsClick = !1);
  gameData.last = 0;
  for (var s = 0; 12 > s; s++) gameData.accessHouses[s] = 0;
  for (var s = 0; 20 > s; s++) gameData.upgrades[s] = 0;
  if (
    ((gameData.sound = !0),
    (gameData.music = !0),
    !ExternalAPI.exec("getStorageSupport") ||
      !ExternalAPI.exec("loadGameData", function (t) {
        t && (gameData = JSON.parse(t)), e && e();
      }))
  )
    if (ExternalAPI.externalStorage)
      ExternalAPI.exec("load", function (e) {
        e && (gameData = e), t();
      }),
        ExternalAPI.exec("loadUserData", function (e) {
          e && (gameData = e), t();
        });
    else {
      var i = Utils.getCookie(getGameDataId());
      i && (gameData = JSON.parse(i)), t();
    }
}
var CRENDER_DEBUG = !1;
"undefined" == typeof window.console &&
  (window.console = { log: function () {} });
var Utils;
window.Utils || (Utils = {}),
  (Utils.detectMobileBrowser = function () {
    var e = !!(
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    );
    return e;
  }),
  (Utils.detectTouchScreen = function () {
    return (
      "ontouchstart" in window ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }),
  (Utils.getTouchStartEvent = function () {
    return Utils.isWindowsPhone() ? "MSPointerDown" : "touchstart";
  }),
  (Utils.getTouchMoveEvent = function () {
    return Utils.isWindowsPhone() ? "MSPointerMove" : "touchmove";
  }),
  (Utils.getTouchEndEvent = function () {
    return Utils.isWindowsPhone() ? "MSPointerUp" : "touchend";
  }),
  (Utils.touchScreen = Utils.detectMobileBrowser()),
  (Utils.globalScale = 1),
  (Utils.globalPixelScale = 1),
  (Utils.isWindowHidden = !1),
  (Utils.DOMMainContainerId = "main_container"),
  (Utils.DOMProgressContainerId = "progress_container"),
  (Utils.DOMProgressId = "progress"),
  (Utils.DOMScreenBackgroundContainerId = "screen_background_container"),
  (Utils.DOMScreenBackgroundWrapperId = "screen_background_wrapper"),
  (Utils.DOMScreenBackgroundId = "screen_background"),
  (Utils.DOMScreenContainerId = "screen_container"),
  (Utils.DOMScreenWrapperId = "screen_wrapper"),
  (Utils.DOMScreenId = "screen"),
  (Utils.DOMP2lContainerId = "p2l_container"),
  (Utils.DOMP2lId = "p2l"),
  (Utils.DOMMarkId = "mark"),
  (Utils.trace = function (e) {
    var t;
    try {
      throw new Error("");
    } catch (s) {
      t = s.stack || "";
    }
    return (
      (t = t.split("\n")),
      t.splice(0, 2),
      (t = t.join("\n")),
      e || console.log(t),
      t
    );
  }),
  (Utils.setCookie = function (e, t) {
    try {
      window.localStorage.setItem(e, t);
    } catch (s) {
      var i = new Date();
      i.setDate(i.getDate() + 3650),
        (document.cookie = e + "=" + t + "; expires=" + i.toUTCString());
    }
  }),
  (Utils.getCookie = function (e) {
    var t;
    try {
      t = window.localStorage.getItem(e);
    } catch (s) {
      var i = e + "=",
        a = document.cookie.indexOf(i);
      if (-1 == a) return null;
      var r = document.cookie.indexOf(";", a + i.length);
      -1 == r && (r = document.cookie.length),
        (t = decodeURIComponent(document.cookie.substring(a + i.length, r)));
    }
    return t;
  }),
  (Utils.bindEvent = function (e, t, s) {
    e.addEventListener
      ? e.addEventListener(t, s, !1)
      : e.attachEvent && e.attachEvent("on" + t.toLowerCase(), s);
  }),
  (Utils.unbindEvent = function (e, t, s) {
    e.removeEventListener
      ? e.removeEventListener(t, s, !1)
      : e.detachEvent && e.detachEvent("on" + t, s);
  }),
  (Utils.getObjectLeft = function (e) {
    var t = e.offsetLeft;
    return e.offsetParent && (t += Utils.getObjectLeft(e.offsetParent)), t;
  }),
  (Utils.getObjectTop = function (e) {
    var t = e.offsetTop;
    return e.offsetParent && (t += Utils.getObjectTop(e.offsetParent)), t;
  }),
  (Utils.parseGet = function () {
    var e,
      t,
      s = {},
      i = window.location.toString(),
      a = window.location.toString().indexOf("?");
    if (a >= 0) {
      (i = i.substr(a + 1, i.length)), (t = i.split("&"));
      for (var r = 0; r < t.length; r++)
        (e = t[r].split("=")), (s[e[0]] = e[1]);
    }
    return s;
  }),
  (Utils.getMouseCoord = function (e, t) {
    var s = e || window.event;
    if ((s.touches && (s = s.touches[0]), !s)) return { x: 0, y: 0 };
    var i = 0,
      a = 0,
      r = 0,
      o = 0;
    t && ((i = Utils.getObjectLeft(t)), (a = Utils.getObjectTop(t))),
      s.pageX || s.pageY
        ? ((r = s.pageX), (o = s.pageY))
        : (s.clientX || s.clientY) &&
          ((r =
            s.clientX +
            (document.documentElement.scrollLeft || document.body.scrollLeft) -
            document.documentElement.clientLeft),
          (o =
            s.clientY +
            (document.documentElement.scrollTop || document.body.scrollTop) -
            document.documentElement.clientTop));
    var n = r - i,
      h = o - a;
    return { x: n, y: h };
  }),
  (Utils.removeFromArray = function (e, t) {
    for (var s = [], i = 0; i < e.length; i++) e[i] != t && s.push(e[i]);
    return s;
  }),
  (Utils.showLoadProgress = function (e) {
    var t = Utils.globalScale,
      s = "Loading: " + e + "%";
    (s += "<br><br>"),
      (s +=
        '<div style="display: block; background: #000; width: ' +
        e * t * 2 +
        "px; height: " +
        10 * t +
        'px;">&nbsp;</div>'),
      (document.getElementById(Utils.DOMProgressId).innerHTML = s);
  }),
  (Utils.hideAddressBarLock = !1),
  (Utils.mobileHideAddressBar = function () {
    Utils.hideAddressBarLock || window.scrollTo(0, 1);
  }),
  (Utils.mobileCheckIphone4 = function () {
    return (
      Utils.detectMobileBrowser() &&
      navigator.userAgent.indexOf("iPhone") >= 0 &&
      2 == window.devicePixelRatio
    );
  }),
  (Utils.mobileCheckBrokenAndroid = function () {
    return (
      Utils.detectMobileBrowser() &&
      Utils.isAndroid() &&
      !Utils.isChrome() &&
      !Utils.isFirefox()
    );
  }),
  (Utils.mobileCheckSlowDevice = function () {
    return (
      (Utils.mobileCheckBrokenAndroid() &&
        navigator.userAgent.toLowerCase().indexOf("sm-t310") >= 0) ||
      (Utils.detectMobileBrowser() &&
        Utils.isAndroid() &&
        Utils.isFirefox() &&
        navigator.userAgent.toLowerCase().indexOf("sm-t310") >= 0)
    );
  }),
  (Utils.isChrome = function () {
    var e = !1;
    if (
      navigator.userAgent.toLowerCase().indexOf("chrome") >= 0 &&
      ((e = !0), Utils.isAndroid())
    ) {
      var t =
        parseInt((/Chrome\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) ||
        0;
      22 > t && (e = !1);
    }
    return e;
  }),
  (Utils.isAndroid = function () {
    return navigator.userAgent.toLowerCase().indexOf("android") >= 0;
  }),
  (Utils.isIOS = function () {
    return !(
      Utils.isWindowsPhone() ||
      !navigator.userAgent.toLowerCase().match(/(ipad|iphone|ipod)/g)
    );
  }),
  (Utils.isPlayFreeBrowser = function () {
    return navigator.userAgent.toLowerCase().indexOf("playfreebrowser") >= 0;
  }),
  (Utils.isFirefox = function () {
    return navigator.userAgent.toLowerCase().indexOf("firefox") >= 0;
  }),
  (Utils.isIE = function () {
    return (
      navigator.userAgent.toLowerCase().indexOf("MSIE") >= 0 ||
      "Microsoft Internet Explorer" == navigator.appName
    );
  }),
  (Utils.isWindowsPhone = function () {
    return navigator.userAgent.toLowerCase().indexOf("windows phone") >= 0;
  }),
  (Utils.disableCorrectPixelRatio = !1),
  (Utils.mobileCorrectPixelRatio = function () {
    if (!Utils.isWindowsPhone()) {
      for (
        var e = document.getElementsByTagName("head")[0],
          t = e.getElementsByTagName("meta"),
          s = !0,
          i = null,
          a = "",
          r = 0;
        r < t.length;
        r++
      )
        if ("viewport" == t[r].name) {
          (i = t[r]), (s = !1);
          break;
        }
      s && ((i = document.createElement("meta")), (i.name = "viewport")),
        (a += "width=device-width, user-scalable=no");
      var o = 1 / (window.devicePixelRatio ? window.devicePixelRatio : 1);
      (o = o.toFixed(2)),
        Utils.disableCorrectPixelRatio && (o = 1),
        (a +=
          ", initial-scale=" +
          o +
          ", maximum-scale=" +
          o +
          ", minimum-scale=" +
          o),
        (i.content = a),
        s && document.getElementsByTagName("head")[0].appendChild(i);
    }
  }),
  (Utils.supportedScales = [
    { scale: 1, width: 320, height: 480 },
    { scale: 1.5, width: 480, height: 720 },
    { scale: 2, width: 640, height: 960 },
  ]),
  (Utils.getMobileScreenResolution = function (e) {
    var t = 1,
      s = window.innerWidth,
      i = window.innerHeight;
    (s && i) || ((s = screen.width), (i = screen.height)),
      Utils.disableCorrectPixelRatio &&
        (t = window.devicePixelRatio ? window.devicePixelRatio : 1),
      (s *= t),
      (i *= t);
    var a = Utils.clone(Utils.supportedScales),
      r = { width: 0, height: 0 },
      o = "";
    if (Utils.detectMobileBrowser())
      (r.width = Math.min(s, i)), (r.height = Math.max(s, i)), (o = "height");
    else {
      if (e)
        for (var n = 0; n < a.length; n++) {
          var h = a[n].width;
          (a[n].width = a[n].height), (a[n].height = h);
        }
      (r.width = s), (r.height = i), (o = "height");
    }
    var l = Number.MAX_VALUE;
    for (n = 0; n < a.length; n++) {
      var p = Math.abs(r[o] - a[n][o]);
      l > p && ((l = p), (t = a[n].scale));
    }
    return Utils.getScaleScreenResolution(t, e);
  }),
  (Utils.getScaleScreenResolution = function (e, t) {
    var s = Math.round(320 * e),
      i = Math.round(480 * e);
    return { width: t ? i : s, height: t ? s : i, scale: e };
  }),
  (Utils.imagesRoot = "images"),
  (Utils.initialResolution = { width: 320, height: 480, scale: 1 }),
  (Utils.ignoreMobileHeightCorrection = !1),
  (Utils.p2lImagePath = null),
  (Utils.createLayout = function (e, t) {
    var s = Utils.globalScale;
    Utils.initialResolution = t;
    var i = window.innerHeight;
    document.body.style.overflow = "hidden";
    var a = Utils.p2lImagePath || Utils.imagesRoot + "/p2l.jpg",
      r = "";
    (r +=
      '<div id="' +
      Utils.DOMProgressContainerId +
      '" align="center" style="width: 100%; height: ' +
      i +
      'px; display: block; position: absolute; left: 0px; top: 0px;">'),
      (r +=
        '<table cellspacing="0" cellpadding="0" border="0"><tr><td id="' +
        Utils.DOMProgressId +
        '" align="center" valign="middle" style="width: ' +
        t.width +
        "px; height: " +
        t.height +
        "px; color: #000; background: #fff; font-weight: bold; font-family: Verdana; font-size: " +
        12 * s +
        'px; vertical-align: middle; box-sizing: border-box"></td></tr></table>'),
      (r += "</div>"),
      (r +=
        '<div id="' +
        Utils.DOMScreenBackgroundContainerId +
        '" style="width: 100%; height: ' +
        i +
        'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 2;">'),
      (r +=
        '<div id="' +
        Utils.DOMScreenBackgroundWrapperId +
        '" style="width: ' +
        t.width +
        "px; height: " +
        t.height +
        'px; position: relative; left: 0px; overflow: hidden;">'),
      (r +=
        '<canvas id="' +
        Utils.DOMScreenBackgroundId +
        '" width="' +
        t.width +
        '" height="' +
        t.height +
        '" style="transform: translateZ(0)"></canvas>'),
      (r += "</div>"),
      (r += "</div>"),
      (r +=
        '<div id="' +
        Utils.DOMScreenContainerId +
        '" style="width: 100%; height: ' +
        i +
        'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 3;">'),
      (r +=
        '<div id="' +
        Utils.DOMScreenWrapperId +
        '" width="' +
        t.width +
        '" height="' +
        t.height +
        '" style="width: ' +
        t.width +
        "px; height: " +
        t.height +
        'px; position: relative; left: 0px; overflow: hidden;">'),
      (r +=
        '<canvas id="' +
        Utils.DOMScreenId +
        '" style="position: absolute; left: 0px; top: 0px;" width="' +
        t.width +
        '" height="' +
        t.height +
        '">You browser does not support this application :(</canvas>'),
      (r += "</div>"),
      (r += "</div>"),
      (e.innerHTML = r);
    var o = document.createElement("div");
    o.setAttribute("id", Utils.DOMP2lContainerId),
      o.setAttribute("align", "center"),
      o.setAttribute(
        "style",
        "width: 100%; height: " +
          i +
          "px; position: absolute; left: 0px; top: 0px; visibility: hidden; z-index: 1000; background-color: #fff; background-image: url(" +
          a +
          "); background-repeat: no-repeat; background-position: center center"
      );
    var n = document.createElement("img");
    if (
      (n.setAttribute("id", Utils.DOMP2lId),
      (n.width = 1),
      (n.height = 1),
      (n.style.display = "none"),
      o.appendChild(n),
      e.appendChild(o),
      window.parent == window && Utils.isAndroid() && Utils.isFirefox())
    ) {
      var h = document.createElement("div");
      h.setAttribute("id", Utils.DOMMarkId),
        (h.style.position = "fixed"),
        (h.style.right = "0px"),
        (h.style.bottom = "0px"),
        (h.style.width = "1px"),
        (h.style.height = "1px"),
        (h.style.background = ""),
        (h.style.zIndex = "100000"),
        e.appendChild(h);
    }
    var l = document.createElement("style");
    l.type = "text/css";
    var p = "html body {-ms-content-zooming:none;";
    (p += "content-zooming:none;"),
      (p += "-ms-touch-action:none;"),
      (p += "touch-action: none;} "),
      (p += "body {margin:0;"),
      (p += "padding:0;"),
      (p += "background:#000;}"),
      (l.innerHTML = p),
      document.getElementsByTagName("head")[0].appendChild(l),
      Utils.addDetectTouchScreenEvents(),
      Utils.fitLayoutToScreen();
  }),
  (Utils.addDetectTouchScreenEvents = function () {
    var e = document.getElementById(Utils.DOMScreenId);
    Utils.bindEvent(e, "mousemove", function () {
      Utils.touchScreen = !1;
    }),
      Utils.bindEvent(e, Utils.getTouchStartEvent(), function () {
        Utils.touchScreen = !0;
      });
  }),
  (Utils.showMainLayoutContent = function () {
    (document.getElementById(Utils.DOMProgressContainerId).style.display =
      "none"),
      (document.getElementById(Utils.DOMScreenContainerId).style.display =
        "block"),
      (document.getElementById(
        Utils.DOMScreenBackgroundContainerId
      ).style.display = "block");
  }),
  (Utils.preventEvent = function (e) {
    return (
      e.preventDefault(),
      e.stopPropagation(),
      (e.cancelBubble = !0),
      (e.returnValue = !1),
      !1
    );
  }),
  (Utils.touchStartEventDisabled = !1),
  (Utils.preventTouchStart = function () {
    Utils.touchStartEventDisabled &&
      Utils.bindEvent(
        document.body,
        Utils.getTouchStartEvent(),
        Utils.preventEvent
      );
  }),
  (Utils.removePreventTouchStart = function () {
    Utils.touchStartEventDisabled &&
      Utils.unbindEvent(
        document.body,
        Utils.getTouchStartEvent(),
        Utils.preventEvent
      );
  }),
  (Utils.addMobileListeners = function (e, t) {
    (!t && navigator.userAgent.match(/(iPad|iPhone|iPod).*CPU.*OS 7_\d/i)) ||
      ((Utils.touchStartEventDisabled = !0), Utils.preventTouchStart()),
      Utils.isPlayFreeBrowser() ||
        Utils.bindEvent(window, "scroll", function () {
          setTimeout(Utils.mobileHideAddressBar, 300);
        });
    var s = Utils.getVisibiltyProps();
    s.visibilityChange &&
      document.addEventListener(
        s.visibilityChange,
        Utils.handleVisibilityChange,
        !1
      ),
      setInterval(function () {
        Utils.checkOrientation(e);
      }, 500),
      setTimeout(Utils.mobileHideAddressBar, 500);
  }),
  (Utils.handleVisibilityChange = function () {
    (Utils.isWindowHidden = document[Utils.getVisibiltyProps().hidden]),
      Utils.dispatchEvent(Utils.isWindowHidden ? "hidewindow" : "showwindow"),
      Utils.fixChromeContext();
  }),
  (Utils.getVisibiltyProps = function () {
    var e, t;
    return (
      "undefined" != typeof document.hidden
        ? ((e = "hidden"), (t = "visibilitychange"))
        : "undefined" != typeof document.mozHidden
        ? ((e = "mozHidden"), (t = "mozvisibilitychange"))
        : "undefined" != typeof document.msHidden
        ? ((e = "msHidden"), (t = "msvisibilitychange"))
        : "undefined" != typeof document.webkitHidden &&
          ((e = "webkitHidden"), (t = "webkitvisibilitychange")),
      { hidden: e, visibilityChange: t }
    );
  }),
  (Utils.staticWindowRect = null),
  (Utils.setWindowRect = function (e, t) {
    Utils.staticWindowRect = { width: e, height: t };
  }),
  (Utils.getWindowRect = function () {
    return window.parent == window &&
      Utils.isAndroid() &&
      Utils.isFirefox() &&
      document.getElementById(Utils.DOMMarkId)
      ? {
          width: window.innerWidth,
          height: document.getElementById(Utils.DOMMarkId).offsetTop + 1,
        }
      : { width: window.innerWidth, height: window.innerHeight };
  }),
  (Utils.storeOrient = null),
  (Utils.noCheckOrient = !1),
  (Utils.checkOrientation = function (e) {
    if (
      Utils.detectMobileBrowser() &&
      document.getElementById(Utils.DOMScreenContainerId) &&
      !Utils.noCheckOrient &&
      1 != Utils.parseGet().nocheckorient
    ) {
      var t = Utils.getWindowRect(),
        s = t.width > t.height;
      if (Utils.storeOrient !== s) {
        Utils.storeOrient = s;
        var i = s == e;
        i
          ? (Utils.dispatchEvent("unlockscreen"),
            (document.getElementById(Utils.DOMP2lContainerId).style.visibility =
              "hidden"),
            (document.getElementById(
              Utils.DOMProgressContainerId
            ).style.visibility = "visible"),
            (document.getElementById(
              Utils.DOMScreenBackgroundContainerId
            ).style.display = "block"),
            (document.getElementById(Utils.DOMScreenContainerId).style.display =
              "block"))
          : (Utils.dispatchEvent("lockscreen"),
            (document.getElementById(Utils.DOMP2lContainerId).style.visibility =
              "visible"),
            (document.getElementById(
              Utils.DOMProgressContainerId
            ).style.visibility = "hidden"),
            (document.getElementById(
              Utils.DOMScreenBackgroundContainerId
            ).style.display = "none"),
            (document.getElementById(Utils.DOMScreenContainerId).style.display =
              "none")),
          setTimeout(Utils.mobileHideAddressBar, 900),
          setTimeout(Utils.fitLayoutToScreen, 1e3);
      }
    }
  }),
  (Utils.fitLayoutTimer = 0),
  (Utils.addFitLayoutListeners = function () {
    Utils.fitLayoutTimer = setInterval(Utils.fitLayoutToScreen, 500);
  }),
  (Utils.removeFitLayoutListeners = function () {
    clearInterval(Utils.fitLayoutTimer);
  }),
  (Utils.fitLayoutLock = !1),
  (Utils.fitLayoutCorrectHeight = 0),
  (Utils.fitLayoutAlign = "center"),
  (Utils.fitLayoutVerticalAlign = "top"),
  (Utils.layoutMargin = { left: 0, right: 0, top: 0, bottom: 0 }),
  (Utils.fixChromeContext = function () {
    if (Utils.isChrome() && !Utils.detectMobileBrowser()) {
      var e = document.getElementById(Utils.DOMScreenId);
      e && (e.width++, e.width--);
    }
  }),
  (Utils.fitLayoutToScreen = function (e) {
    var t, s, i, a, r;
    if (
      (Utils.isWindowHidden && Utils.fixChromeContext(),
      !Utils.fitLayoutLock &&
        ((r = Utils.getWindowRect()),
        ("object" == typeof e && e.width) ||
          ((a = Utils.staticWindowRect ? Utils.staticWindowRect : r),
          (s = a.width),
          (i = a.height),
          (i += Utils.fitLayoutCorrectHeight),
          (i -= Utils.layoutMargin.top),
          (i -= Utils.layoutMargin.bottom),
          (s -= Utils.layoutMargin.left),
          (s -= Utils.layoutMargin.right),
          (e = { width: s, height: i })),
        e.width &&
          e.height &&
          (t = document.getElementById(Utils.DOMScreenWrapperId))))
    ) {
      t.initWidth ||
        ((t.initWidth = Utils.initialResolution.width),
        (t.initHeight = Utils.initialResolution.height)),
        (s = t.initWidth),
        (i = t.initHeight);
      var o = e.width / s,
        n = e.height / i,
        h = n > o ? o : n;
      if (
        ((Utils.globalPixelScale = h),
        (s = Math.floor(s * h)),
        (i = Math.floor(i * h)),
        t.lastWidth != e.width ||
          t.lastHeight != e.height ||
          t.lastRealWidth != r.width ||
          t.lastRealHeight != r.height)
      ) {
        (t.lastWidth = e.width),
          (t.lastHeight = e.height),
          (t.lastRealWidth = r.width),
          (t.lastRealHeight = r.height),
          Utils.resizeElement(Utils.DOMScreenId, s, i),
          Utils.resizeElement(Utils.DOMScreenBackgroundId, s, i),
          Utils.resizeElement(Utils.DOMProgressContainerId, a.width, a.height),
          Utils.resizeElement(Utils.DOMProgressId, s, i),
          (t = Utils.resizeElement(Utils.DOMScreenWrapperId, s, i)),
          Utils.alignElement(t, r, s, i),
          (t = Utils.resizeElement(Utils.DOMScreenBackgroundWrapperId, s, i)),
          Utils.alignElement(t, r, s, i),
          Utils.resizeElement(Utils.DOMP2lContainerId, a.width, a.height),
          Utils.resizeElement(Utils.DOMScreenContainerId, a.width, a.height),
          Utils.resizeElement(
            Utils.DOMScreenBackgroundContainerId,
            a.width,
            a.height
          );
        var l = Math.floor(Math.min(r.width, r.height) / 2);
        (t = document.getElementById(Utils.DOMP2lContainerId)),
          t && (t.style.backgroundSize = l + "px " + l + "px"),
          Utils.dispatchEvent("fitlayout"),
          Utils.isPlayFreeBrowser() && window.scrollTo(1, 2),
          setTimeout(Utils.mobileHideAddressBar, 10),
          Utils.fixChromeContext();
      }
    }
  }),
  (Utils.alignElement = function (e, t, s, i) {
    e &&
      ("left" == Utils.fitLayoutAlign
        ? (e.style.left = Utils.layoutMargin.left + "px")
        : "right" == Utils.fitLayoutAlign
        ? (e.style.left =
            Math.floor(t.width - s - Utils.layoutMargin.right) + "px")
        : (e.style.left =
            Math.floor(
              (t.width -
                s -
                Utils.layoutMargin.left -
                Utils.layoutMargin.right) /
                2
            ) + "px"),
      "top" == Utils.fitLayoutVerticalAlign
        ? (e.style.top = Utils.layoutMargin.top + "px")
        : "bottom" == Utils.fitLayoutVerticalAlign
        ? (e.style.top =
            Math.floor(t.height - i - Utils.layoutMargin.bottom) + "px")
        : (e.style.top =
            Math.floor(
              (t.height -
                i -
                Utils.layoutMargin.top -
                Utils.layoutMargin.bottom) /
                2
            ) + "px"));
  }),
  (Utils.resizeElement = function (e, t, s) {
    var i = document.getElementById(e);
    return i
      ? ((i.style.width = Math.floor(t) + "px"),
        (i.style.height = Math.floor(s) + "px"),
        i)
      : null;
  }),
  (Utils.drawIphoneLimiter = function (e, t) {
    t
      ? e.drawRectangle(240, 295, 480, 54, "#f00", !0, 0.5, !0)
      : e.drawRectangle(160, 448, 320, 64, "#f00", !0, 0.5, !0);
  }),
  (Utils.drawGrid = function (e, t, s) {
    "undefined" == typeof t && (t = !1);
    var i = 10,
      a = 10;
    "undefined" == typeof s && (s = "#FFF");
    for (
      var r = 1, o = { w: t ? 480 : 320, h: t ? 320 : 480 }, n = i;
      n < o.w;
      n += i
    ) {
      var h = 0.1 + 0.1 * (((n - i) / i) % 10);
      e.drawLine(n, 0, n, o.h, r, s, h);
    }
    for (var l = a; l < o.h; l += a)
      (h = 0.1 + 0.1 * (((l - a) / a) % 10)), e.drawLine(0, l, o.w, l, r, s, h);
  }),
  (Utils.drawScaleFix = function (e, t) {
    0.75 == Utils.globalScale &&
      (t
        ? e.drawRectangle(507, 160, 54, 320, "#000", !0, 1, !0)
        : e.drawRectangle(160, 507, 320, 54, "#000", !0, 1, !0)),
      1.5 == Utils.globalScale &&
        (t
          ? e.drawRectangle(510, 160, 60, 320, "#000", !0, 1, !0)
          : e.drawRectangle(160, 510, 320, 60, "#000", !0, 1, !0));
  }),
  (Utils.grad2radian = function (e) {
    return e / (180 / Math.PI);
  }),
  (Utils.radian2grad = function (e) {
    return e * (180 / Math.PI);
  }),
  (Utils.eventsListeners = []),
  (Utils.onlockscreen = null),
  (Utils.onunlockscreen = null),
  (Utils.onhidewindow = null),
  (Utils.onshowwindow = null),
  (Utils.onfitlayout = null),
  (Utils.addEventListener = function (e, t) {
    EventsManager.addEvent(Utils, e, t, !1);
  }),
  (Utils.addEventListenerOnce = function (e, t) {
    EventsManager.addEvent(Utils, e, t, !0);
  }),
  (Utils.removeEventListener = function (e, t) {
    EventsManager.removeEvent(Utils, e, t);
  }),
  (Utils.dispatchEvent = function (e, t) {
    return EventsManager.dispatchEvent(Utils, e, t);
  }),
  (Utils.isArray = function (e) {
    return Array.isArray
      ? Array.isArray(e)
      : "[object Array]" === Object.prototype.toString.call(e);
  }),
  (Utils.isPlainObject = function (e) {
    return e && e.constructor ? e.constructor === Object : !1;
  }),
  (Utils.getFunctionArguments = function (e, t) {
    return "undefined" == typeof t && (t = 0), [].slice.call(e, t);
  }),
  (Utils.proxy = function (e, t) {
    for (var s = [], i = 2; i < arguments.length; i++) s.push(arguments[i]);
    return function () {
      for (var i = [], a = 0; a < arguments.length; a++) i.push(arguments[a]);
      return e.apply(t || this, i.concat(s));
    };
  }),
  (Utils.extend = function (e, t) {
    var s = function () {};
    (s.prototype = t.prototype),
      (e.prototype = new s()),
      (e.prototype.constructor = e),
      (e.superclass = t.prototype);
  }),
  (Utils.callSuperConstructor = function (e, t) {
    for (var s = [], i = 2; i < arguments.length; i++) s.push(arguments[i]);
    e.superclass.constructor.apply(t, s);
  }),
  (Utils.callSuperMethod = function (e, t, s) {
    for (var i = [], a = 3; a < arguments.length; a++) i.push(arguments[a]);
    return e.superclass[s].apply(t, i);
  }),
  (Utils.copyObjectProps = function (e, t) {
    for (var s in e)
      if (e.hasOwnProperty(s))
        if (Utils.isArray(e[s])) {
          t[s] = [];
          for (var i = 0; i < e[s].length; i++)
            "object" == typeof e[s][i] && null !== e[s][i]
              ? ((t[s][i] = Utils.cloneEmptyObject(e[s][i])),
                Utils.copyObjectProps(e[s][i], t[s][i]))
              : (t[s][i] = e[s][i]);
        } else
          Utils.isPlainObject(e[s])
            ? ((t[s] = {}), Utils.copyObjectProps(e[s], t[s]))
            : (t[s] = e[s]);
  }),
  (Utils.cloneEmptyObject = function (e) {
    return e.constructor ? new e.constructor() : {};
  }),
  (Utils.clone = function (e) {
    if (!e || "object" != typeof e) return e;
    var t = Utils.cloneEmptyObject(e);
    return Utils.copyObjectProps(e, t), t;
  }),
  (Utils.switchToTimeMode = function (e) {
    (Stage.TIMER_MODE = Stage.TIMER_MODE_TIME),
      (Tween.STEP_TYPE = Tween.STEP_BY_TIME),
      (StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_TIME),
      (Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_TIME),
      (Sprite.CHANGE_FRAME_DELAY = e);
  }),
  (Utils.getGameID = function () {
    if (window.GAME_ID && "my_game" != window.GAME_ID) return window.GAME_ID;
    for (var e = window.location.toString(), t = e.split("/"), s = ""; !s; )
      (s = t.pop()),
        s.split(".").length > 1 && (s = ""),
        0 == t.length && (s = "my_game");
    return s;
  }),
  (Utils.ajax = function (e, t, s, i, a, r) {
    function o(e) {
      "json" == i && (e = JSON.parse(e)),
        "xml" == i && (e = Utils.parseXMLString(e)),
        a && a(e, n);
    }
    var n,
      h = !1;
    if (
      ((n = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP")),
      Utils.isIE() && window.XDomainRequest && !document.addEventListener)
    ) {
      var l = document.createElement("a");
      (l.href = e),
        window.location.hostname &&
          l.hostname &&
          window.location.hostname != l.hostname &&
          ((n = new XDomainRequest()), (h = !0));
    }
    if (
      (h
        ? ((n.onload = function () {
            o(n.responseText);
          }),
          (n.onerror = function () {
            r && r(1, n);
          }),
          (n.ontimeout = function () {
            r && r(0, n);
          }))
        : (n.onreadystatechange = function () {
            if (4 == n.readyState) {
              var e = n.responseText;
              (200 != n.status && 0 != n.status) || !e
                ? r && r(n.status, n)
                : o(e);
            }
          }),
      s)
    ) {
      if ("string" != typeof s) {
        var p = [];
        for (var d in s)
          p.push(encodeURIComponent(d) + "=" + encodeURIComponent(s[d]));
        s = p.join("&");
      }
    } else s = "";
    t || (t = "GET"),
      n.open(t, e + ("GET" == t ? "?" + s : ""), !0),
      "POST" != t ||
        h ||
        n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      n.send("GET" != t ? s : null);
  }),
  (Utils.get = function (e, t, s, i, a) {
    Utils.ajax(e, "GET", t, s, i, a);
  }),
  (Utils.post = function (e, t, s, i, a) {
    Utils.ajax(e, "POST", t, s, i, a);
  }),
  (Utils.getBezierBasis = function (e, t, s) {
    function i(e) {
      return 1 >= e ? 1 : e * i(e - 1);
    }
    return (i(t) / (i(e) * i(t - e))) * Math.pow(s, e) * Math.pow(1 - s, t - e);
  }),
  (Utils.getBezierCurve = function (e, t) {
    "undefined" == typeof t && (t = 0.1);
    var s = [];
    t /= e.length;
    for (var i = 0; 1 + t > i; i += t) {
      i > 1 && (i = 1);
      var a = s.length;
      s[a] = { x: 0, y: 0 };
      for (var r = 0; r < e.length; r++) {
        var o = Utils.getBezierBasis(r, e.length - 1, i);
        (s[a].x += e[r].x * o), (s[a].y += e[r].y * o);
      }
    }
    return s;
  }),
  (Utils.parseXMLString = function (e) {
    var t = null;
    if ("undefined" != typeof window.DOMParser)
      t = new window.DOMParser().parseFromString(e, "text/xml");
    else {
      if (
        "undefined" == typeof window.ActiveXObject ||
        !new window.ActiveXObject("Microsoft.XMLDOM")
      )
        throw new Error("No XML parser found");
      (t = new window.ActiveXObject("Microsoft.XMLDOM")),
        (t.async = "false"),
        t.loadXML(e);
    }
    return t;
  }),
  (Utils.gotoFullScreen = function (e) {
    (e = e || document.documentElement),
      e.requestFullscreen && e.requestFullscreen(),
      e.webkitRequestFullscreen && e.webkitRequestFullscreen(),
      e.mozRequestFullScreen && e.mozRequestFullScreen(),
      e.msRequestFullscreen && e.msRequestFullscreen();
  }),
  (Utils.cancelFullScreen = function () {
    document.cancelFullScreen && document.cancelFullScreen(),
      document.webkitCancelFullScreen && document.webkitCancelFullScreen(),
      document.mozCancelFullScreen && document.mozCancelFullScreen(),
      document.msExitFullscreen && document.msExitFullscreen(),
      document.exitFullscreen && document.exitFullscreen();
  }),
  (Utils.isFullScreen = function () {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }),
  (Utils.isFullScreenEnabled = function () {
    return !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }),
  (Utils.toggleFullScreen = function (e) {
    Utils.isFullScreen() ? Utils.cancelFullScreen() : Utils.gotoFullScreen(e);
  }),
  (Utils.sign = function (e) {
    return 0 == e ? 0 : e > 0 ? 1 : -1;
  }),
  (ImagesPreloader.prototype.load = function (e, t, s) {
    (this.data = e), (this.endCallback = t), (this.processCallback = s);
    for (var i = 0; i < this.data.length; i++) {
      var a = this.data[i],
        r = new Image();
      (r.src = a.src), (this.loadedImages[a.name] = r);
    }
    this.wait();
  }),
  (ImagesPreloader.prototype.wait = function () {
    var e = 0,
      t = 0;
    for (var s in this.loadedImages) this.loadedImages[s].complete && e++, t++;
    e >= t
      ? this.endCallback && this.endCallback(this.loadedImages)
      : (this.processCallback &&
          this.processCallback(
            Math.floor((e / t) * this.maxProgressVal + this.minProgressVal)
          ),
        setTimeout(this.wait, 50));
  }),
  (SoundsPreloader.prototype.isMp3Support = function () {
    return "" != document.createElement("audio").canPlayType("audio/mpeg");
  }),
  (SoundsPreloader.prototype.isWebAudio = function () {
    return Boolean(window.AudioMixer) && AudioMixer.isWebAudioSupport();
  }),
  (SoundsPreloader.prototype.load = function (e, t, s) {
    if (
      (e && (this.sounds = e),
      t && (this.endCallback = t),
      s && (this.progressCallback = s),
      !this.sounds || this.sounds.length < 1 || !this.isWebAudio())
    )
      return void (this.endCallback && this.endCallback());
    var i,
      a,
      r,
      o = this.isMp3Support() ? "mp3" : "ogg";
    this.loadedCount = 0;
    for (var n = this, h = 0; h < this.sounds.length; h++)
      (a = this.sounds[h] + "." + o),
        this.isWebAudio()
          ? ((i = window.XMLHttpRequest
              ? new XMLHttpRequest()
              : new ActiveXObject("Microsoft.XMLHTTP")),
            i.open("GET", a, !0),
            (i.responseType = "arraybuffer"),
            (i.onreadystatechange = function () {
              if (
                4 == this.readyState &&
                (200 == this.status || 0 == this.status)
              ) {
                var e = this.soundSrc;
                AudioMixer.waContext ||
                  (AudioMixer.waContext = new AudioContext()),
                  AudioMixer.waContext.decodeAudioData(
                    this.response,
                    function (t) {
                      (AudioMixer.buffer[e] = t), n.soundIsLoaded(null, n);
                    },
                    function () {
                      n.soundIsLoaded(null, n);
                    }
                  );
              }
              4 == this.readyState &&
                404 == this.status &&
                n.soundIsLoaded(null, n);
            }),
            (i.soundSrc = a),
            i.send())
          : ((r = document.createElement("audio")),
            (r.src = a),
            (r.type = "mp3" == o ? "audio/mpeg" : "audio/ogg"),
            (r.preload = "auto"),
            r.load(),
            r.addEventListener(
              "canplay",
              Utils.proxy(this.soundIsLoaded, r, this)
            ),
            r.addEventListener(
              "canplaythrough",
              Utils.proxy(this.soundIsLoaded, r, this)
            ));
  }),
  (SoundsPreloader.prototype.soundIsLoaded = function (e, t) {
    if (this.nodeName && "audio" == this.nodeName.toLowerCase()) {
      if (this.alreadyLoaded) return;
      this.alreadyLoaded = !0;
    }
    t.loadedCount++,
      t.progressCallback &&
        t.progressCallback(
          Math.floor(
            (t.loadedCount / t.sounds.length) * t.maxProgressVal +
              t.minProgressVal
          )
        ),
      t.loadedCount >= t.sounds.length && t.endCallback && t.endCallback();
  }),
  (Asset.prototype.detectSize = function () {
    if (!this.bitmap) return !1;
    try {
      isNaN(this.width) &&
        (this.width = this.bitmap.width ? parseInt(this.bitmap.width) : 0),
        isNaN(this.height) &&
          (this.height = this.bitmap.height ? parseInt(this.bitmap.height) : 0);
    } catch (e) {
      CRENDER_DEBUG && console.log(e);
    }
    return !isNaN(this.width) && !isNaN(this.height);
  }),
  (Asset.prototype.normalize = function (e) {
    this.ready ||
      (this.detectSize() &&
        ((isNaN(this.frames) || this.frames < 1) && (this.frames = 1),
        (isNaN(this.layers) || this.layers < 1) && (this.layers = 1),
        (this.width = Math.ceil(this.width / this.layers / e)),
        (this.height = Math.ceil(this.height / this.frames / e)),
        (this.ready = !0)));
  }),
  (AssetsLibrary.prototype.init = function (e, t) {
    "undefined" != typeof e && (this.path = e + ""),
      "undefined" != typeof t &&
        ((this.scale = parseFloat(t)), isNaN(this.scale) && (this.scale = 1));
  }),
  (AssetsLibrary.prototype.load = function (e, t, s, i) {
    (this.onload = e), (this.onloadprogress = t);
    var a = new ImagesPreloader(),
      r = [];
    for (var o in this.items) r.push(this.items[o]);
    "undefined" != typeof s && (a.minProgressVal = s),
      "undefined" != typeof i && (a.maxProgressVal = i),
      a.load(r, this.onLoadHandler, this.onLoadProgressHandler);
  }),
  (AssetsLibrary.prototype.onLoadProgressHandler = function (e) {
    "function" == typeof this.onloadprogress && this.onloadprogress(e);
  }),
  (AssetsLibrary.prototype.onLoadHandler = function (e) {
    this.loaded = !0;
    for (var t in e) {
      var s = e[t],
        i = this.items[t];
      (i.bitmap = s), i.normalize(this.scale);
    }
    "function" == typeof this.onload && this.onload(this.items);
  }),
  (AssetsLibrary.prototype.addAssets = function (e) {
    if ("undefined" != typeof e && "object" == typeof e)
      for (var t = 0; t < e.length; t++) {
        var s = e[t];
        (s.noscale = "undefined" == typeof s.noscale ? !1 : s.noscale),
          s.noscale || (s.src = "%SCALE%/" + s.src),
          this.addAsset(s);
      }
  }),
  (AssetsLibrary.prototype.addAsset = function (e, t, s, i, a, r) {
    function o(e) {
      var t = e.split("/");
      return (t = t.pop()), (t = t.split(".")), (t = t.shift() + "");
    }
    var n = null,
      h = null;
    "object" == typeof e &&
      1 == arguments.length &&
      ((t = e.name),
      (s = e.width || NaN),
      (i = e.height || NaN),
      (a = e.frames || 1),
      (r = e.layers || 1),
      (n = e.spriteClass || null),
      (h = e.properties || null),
      (e = e.src)),
      (e = e.replace("%SCALE%", "%PATH%/" + this.scale)),
      (e = e.replace("%PATH%", this.path)),
      "undefined" == typeof t && (t = o(e));
    var l = new Asset(t, e, s, i, a, r);
    if (((l.spriteClass = n), h))
      for (var p in h) "undefined" == typeof l[p] && (l[p] = h[p]);
    return (this.items[t] = l), l;
  }),
  (AssetsLibrary.prototype.addObject = function (e) {
    var t = this.addAsset(
      "%SCALE%/" + e.image,
      e.name,
      e.width * this.scale,
      e.height * this.scale,
      e.frames,
      e.layers
    );
    return t && (t.object = e), t;
  }),
  (AssetsLibrary.prototype.getAsset = function (e, t) {
    var s = null;
    if (
      ("undefined" != typeof this.items[e] &&
        this.items[e].bitmap &&
        ((t = "undefined" == typeof t ? !0 : t),
        (s = !t || this.items[e].ready ? this.items[e] : null)),
      !s)
    )
      throw new Error('Trying to get undefined asset "' + e + '"');
    return s;
  }),
  (AssetsLibrary.prototype.getSprite = function (name, params, spriteClass) {
    var mc = null,
      asset = null;
    try {
      asset = this.getAsset(name, !0);
    } catch (e) {
      asset = new Asset();
    }
    if (
      ((spriteClass =
        spriteClass || asset.spriteClass || this.spriteClass || Sprite),
      "string" == typeof spriteClass &&
        (spriteClass = window[spriteClass]
          ? window[spriteClass]
          : eval(spriteClass)),
      (mc =
        spriteClass.create && "function" == typeof spriteClass.create
          ? spriteClass.create(asset, this)
          : new spriteClass(
              asset.bitmap,
              asset.width,
              asset.height,
              asset.frames,
              asset.layers
            )),
      params && "object" == typeof params)
    )
      for (var prop in params) mc[prop] = params[prop];
    return mc;
  }),
  (AssetsLibrary.prototype.getBitmap = function (e) {
    try {
      var t = this.getAsset(e, !0);
      return t.bitmap;
    } catch (s) {
      return null;
    }
  }),
  (Vector.prototype.isZero = function () {
    return 0 == this.x && 0 == this.y;
  }),
  (Vector.prototype.clone = function () {
    return new Vector(this.x, this.y);
  }),
  (Vector.prototype.add = function (e) {
    return (this.x += e.x), (this.y += e.y), this;
  }),
  (Vector.prototype.subtract = function (e) {
    return (this.x -= e.x), (this.y -= e.y), this;
  }),
  (Vector.prototype.mult = function (e) {
    return (this.x *= e), (this.y *= e), this;
  }),
  (Vector.prototype.invert = function () {
    return this.mult(-1), this;
  }),
  (Vector.prototype.rotate = function (e, t) {
    "undefined" == typeof t && (t = new Vector(0, 0));
    var s = this.clone();
    return (
      s.subtract(t),
      (s.x = this.x * Math.cos(e) + this.y * Math.sin(e)),
      (s.y = this.x * -Math.sin(e) + this.y * Math.cos(e)),
      s.add(t),
      (this.x = s.x),
      (this.y = s.y),
      this
    );
  }),
  (Vector.prototype.normalize = function (e, t) {
    return (
      "undefined" == typeof t && (t = new Vector(0, 0)),
      this.subtract(t),
      this.rotate(-e),
      this
    );
  }),
  (Vector.prototype.getLength = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }),
  (Vector.prototype.distanceTo = function (e) {
    var t = this.clone();
    return t.subtract(e), t.getLength();
  }),
  (Rectangle.prototype.clone = function () {
    return new Rectangle(
      this.center.x,
      this.center.y,
      this.width,
      this.height,
      this.angle
    );
  }),
  (Rectangle.prototype.refreshVertices = function () {
    var e = this.width / 2,
      t = this.height / 2;
    (this.vertices = []),
      this.vertices.push(new Vector(-e, t)),
      this.vertices.push(new Vector(e, t)),
      this.vertices.push(new Vector(e, -t)),
      this.vertices.push(new Vector(-e, -t)),
      (this.AABB = [this.center.clone(), this.center.clone()]);
    for (var s = 0; 4 > s; s++)
      this.vertices[s].rotate(-this.angle, this.center),
        this.vertices[s].x < this.AABB[0].x &&
          (this.AABB[0].x = this.vertices[s].x),
        this.vertices[s].x > this.AABB[1].x &&
          (this.AABB[1].x = this.vertices[s].x),
        this.vertices[s].y < this.AABB[0].y &&
          (this.AABB[0].y = this.vertices[s].y),
        this.vertices[s].y > this.AABB[1].y &&
          (this.AABB[1].y = this.vertices[s].y);
  }),
  (Rectangle.prototype.move = function (e, t) {
    this.center.add(new Vector(e, t)), this.refreshVertices();
  }),
  (Rectangle.prototype.rotate = function (e) {
    (this.angle += e), this.refreshVertices();
  }),
  (Rectangle.prototype.hitTestPoint = function (e) {
    var t = e.clone();
    return (
      t.normalize(-this.angle, this.center),
      Math.abs(t.x) <= this.width / 2 && Math.abs(t.y) <= this.height / 2
    );
  }),
  (Rectangle.prototype.hitTestRectangle = function (e) {
    var t,
      s,
      i,
      a = this.clone(),
      r = e.clone();
    return (
      a.move(-this.center.x, -this.center.y),
      r.move(-this.center.x, -this.center.y),
      r.center.rotate(this.angle),
      a.rotate(-this.angle),
      r.rotate(-this.angle),
      (t =
        Math.max(a.AABB[0].x, a.AABB[1].x, r.AABB[0].x, r.AABB[1].x) -
        Math.min(a.AABB[0].x, a.AABB[1].x, r.AABB[0].x, r.AABB[1].x)),
      (s = a.AABB[1].x - a.AABB[0].x),
      (i = r.AABB[1].x - r.AABB[0].x),
      t > s + i
        ? !1
        : ((t =
            Math.max(a.AABB[0].y, a.AABB[1].y, r.AABB[0].y, r.AABB[1].y) -
            Math.min(a.AABB[0].y, a.AABB[1].y, r.AABB[0].y, r.AABB[1].y)),
          (s = a.AABB[1].y - a.AABB[0].y),
          (i = r.AABB[1].y - r.AABB[0].y),
          t > s + i
            ? !1
            : (a.move(-r.center.x, -r.center.y),
              r.move(-r.center.x, -r.center.y),
              a.center.rotate(r.angle),
              a.refreshVertices(),
              a.rotate(-r.angle),
              r.rotate(-r.angle),
              (t =
                Math.max(a.AABB[0].x, a.AABB[1].x, r.AABB[0].x, r.AABB[1].x) -
                Math.min(a.AABB[0].x, a.AABB[1].x, r.AABB[0].x, r.AABB[1].x)),
              (s = a.AABB[1].x - a.AABB[0].x),
              (i = r.AABB[1].x - r.AABB[0].x),
              t > s + i
                ? !1
                : ((t =
                    Math.max(
                      a.AABB[0].y,
                      a.AABB[1].y,
                      r.AABB[0].y,
                      r.AABB[1].y
                    ) -
                    Math.min(
                      a.AABB[0].y,
                      a.AABB[1].y,
                      r.AABB[0].y,
                      r.AABB[1].y
                    )),
                  (s = a.AABB[1].y - a.AABB[0].y),
                  (i = r.AABB[1].y - r.AABB[0].y),
                  s + i >= t)))
    );
  });
var EventsManager = {};
(EventsManager.addEvent = function (e, t, s, i) {
  if (e.eventsListeners) {
    for (var a = 0; a < e.eventsListeners.length; a++)
      if (
        e.eventsListeners[a].type === t &&
        e.eventsListeners[a].callback === s
      )
        return;
    e.eventsListeners.push({ type: t, callback: s, once: !!i });
  }
}),
  (EventsManager.removeEvent = function (e, t, s) {
    if (e.eventsListeners) {
      e["on" + t] == s && (e["on" + t] = null);
      for (var i = 0; i < e.eventsListeners.length; i++)
        if (
          e.eventsListeners[i].type === t &&
          e.eventsListeners[i].callback === s
        )
          return void (e.eventsListeners = Utils.removeFromArray(
            e.eventsListeners,
            e.eventsListeners[i]
          ));
    }
  }),
  (EventsManager.dispatchEvent = function (e, t, s) {
    if (e.eventsListeners) {
      var i = !0;
      if ("function" == typeof e["on" + t] && ((i = e["on" + t](s)), i === !1))
        return !1;
      for (
        var a = [], r = 0;
        r < e.eventsListeners.length &&
        (e.eventsListeners[r].type !== t ||
          (e.eventsListeners[r].once && a.push(e.eventsListeners[r]),
          (i = e.eventsListeners[r].callback(s)),
          i !== !1));
        r++
      );
      for (r = 0; r < a.length; r++)
        EventsManager.removeEvent(e, t, a[r].callback);
      return i === !1 ? !1 : void 0;
    }
  }),
  (EventsManager.hasEventListener = function (e, t) {
    if (!e.eventsListeners) return !1;
    if (e["on" + t]) return !0;
    for (var s = 0; s < e.eventsListeners.length; s++)
      if (e.eventsListeners[s].type === t) return !0;
    return !1;
  }),
  (EventsManager.removeAllEventListeners = function (e, t) {
    if (e.eventsListeners) {
      "undefined" == typeof t
        ? (e.eventsListeners = [])
        : e["on" + t] && (e["on" + t] = null);
      for (var s = [], i = 0; i < e.eventsListeners.length; i++)
        e.eventsListeners[i].type !== t && s.push(e.eventsListeners[i]);
      e.eventsListeners = s;
    }
  }),
  (EventsProxy.prototype.addEventListener = function (e, t) {
    EventsManager.addEvent(this, e, t, !1);
  }),
  (EventsProxy.prototype.addEventListenerOnce = function (e, t) {
    EventsManager.addEvent(this, e, t, !0);
  }),
  (EventsProxy.prototype.removeEventListener = function (e, t) {
    EventsManager.removeEvent(this, e, t);
  }),
  (EventsProxy.prototype.dispatchEvent = function (e, t) {
    return EventsManager.dispatchEvent(this, e, t);
  }),
  (EventsProxy.prototype.hasEventListener = function (e) {
    return EventsManager.hasEventListener(this, e);
  }),
  (EventsProxy.prototype.removeAllEventListeners = function (e) {
    EventsManager.removeAllEventListeners(this, e);
  });
var Easing = {};
(Easing.back = {
  easeIn: function (e, t, s, i) {
    var a = 1.70158;
    return s * (e /= i) * e * ((a + 1) * e - a) + t;
  },
  easeOut: function (e, t, s, i) {
    var a = 1.70158;
    return s * ((e = e / i - 1) * e * ((a + 1) * e + a) + 1) + t;
  },
  easeInOut: function (e, t, s, i) {
    var a = 1.70158;
    return (e /= i / 2) < 1
      ? (s / 2) * (e * e * (((a *= 1.525) + 1) * e - a)) + t
      : (s / 2) * ((e -= 2) * e * (((a *= 1.525) + 1) * e + a) + 2) + t;
  },
}),
  (Easing.bounce = {
    easeIn: function (e, t, s, i) {
      return s - Easing.bounce.easeOut(i - e, 0, s, i) + t;
    },
    easeOut: function (e, t, s, i) {
      return (e /= i) < 1 / 2.75
        ? s * (7.5625 * e * e) + t
        : 2 / 2.75 > e
        ? s * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + t
        : 2.5 / 2.75 > e
        ? s * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + t
        : s * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + t;
    },
    easeInOut: function (e, t, s, i) {
      return i / 2 > e
        ? 0.5 * Easing.bounce.easeIn(2 * e, 0, s, i) + t
        : 0.5 * Easing.bounce.easeOut(2 * e - i, 0, s, i) + 0.5 * s + t;
    },
  }),
  (Easing.circular = {
    easeIn: function (e, t, s, i) {
      return -s * (Math.sqrt(1 - (e /= i) * e) - 1) + t;
    },
    easeOut: function (e, t, s, i) {
      return s * Math.sqrt(1 - (e = e / i - 1) * e) + t;
    },
    easeInOut: function (e, t, s, i) {
      return (e /= i / 2) < 1
        ? (-s / 2) * (Math.sqrt(1 - e * e) - 1) + t
        : (s / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
    },
  }),
  (Easing.cubic = {
    easeIn: function (e, t, s, i) {
      return s * (e /= i) * e * e + t;
    },
    easeOut: function (e, t, s, i) {
      return s * ((e = e / i - 1) * e * e + 1) + t;
    },
    easeInOut: function (e, t, s, i) {
      return (e /= i / 2) < 1
        ? (s / 2) * e * e * e + t
        : (s / 2) * ((e -= 2) * e * e + 2) + t;
    },
  }),
  (Easing.elastic = {
    easeIn: function (e, t, s, i) {
      if (0 == s) return t;
      var a = 1.70158,
        r = 0,
        o = 1 * s;
      return 0 == e
        ? t
        : 1 == (e /= i)
        ? t + s
        : (r || (r = 0.3 * i),
          o < Math.abs(s)
            ? ((o = 1 * s), (a = r / 4))
            : (a = (r / (2 * Math.PI)) * Math.asin(s / o)),
          -(
            o *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e * i - a) * (2 * Math.PI)) / r)
          ) + t);
    },
    easeOut: function (e, t, s, i) {
      if (0 == s) return t;
      var a = 1.70158,
        r = 0,
        o = 1 * s;
      return 0 == e
        ? t
        : 1 == (e /= i)
        ? t + s
        : (r || (r = 0.3 * i),
          o < Math.abs(s)
            ? ((o = 1 * s), (a = r / 4))
            : (a = (r / (2 * Math.PI)) * Math.asin(s / o)),
          o *
            Math.pow(2, -10 * e) *
            Math.sin(((e * i - a) * (2 * Math.PI)) / r) +
            s +
            t);
    },
    easeInOut: function (e, t, s, i) {
      if (0 == s) return t;
      var a = 1.70158,
        r = 0,
        o = 1 * s;
      return 0 == e
        ? t
        : 2 == (e /= i / 2)
        ? t + s
        : (r || (r = i * (0.3 * 1.5)),
          o < Math.abs(s)
            ? ((o = 1 * s), (a = r / 4))
            : (a = (r / (2 * Math.PI)) * Math.asin(s / o)),
          1 > e
            ? -0.5 *
                (o *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin(((e * i - a) * (2 * Math.PI)) / r)) +
              t
            : o *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e * i - a) * (2 * Math.PI)) / r) *
                0.5 +
              s +
              t);
    },
  }),
  (Easing.exponential = {
    easeIn: function (e, t, s, i) {
      return 0 == e ? t : s * Math.pow(2, 10 * (e / i - 1)) + t;
    },
    easeOut: function (e, t, s, i) {
      return e == i ? t + s : s * (-Math.pow(2, (-10 * e) / i) + 1) + t;
    },
    easeInOut: function (e, t, s, i) {
      return 0 == e
        ? t
        : e == i
        ? t + s
        : (e /= i / 2) < 1
        ? (s / 2) * Math.pow(2, 10 * (e - 1)) + t
        : (s / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
    },
  }),
  (Easing.linear = {
    easeIn: function (e, t, s, i) {
      return (s * e) / i + t;
    },
    easeOut: function (e, t, s, i) {
      return (s * e) / i + t;
    },
    easeInOut: function (e, t, s, i) {
      return (s * e) / i + t;
    },
  }),
  (Easing.quadratic = {
    easeIn: function (e, t, s, i) {
      return s * (e /= i) * e + t;
    },
    easeOut: function (e, t, s, i) {
      return -s * (e /= i) * (e - 2) + t;
    },
    easeInOut: function (e, t, s, i) {
      return (e /= i / 2) < 1
        ? (s / 2) * e * e + t
        : (-s / 2) * (--e * (e - 2) - 1) + t;
    },
  }),
  (Easing.quartic = {
    easeIn: function (e, t, s, i) {
      return s * (e /= i) * e * e * e + t;
    },
    easeOut: function (e, t, s, i) {
      return -s * ((e = e / i - 1) * e * e * e - 1) + t;
    },
    easeInOut: function (e, t, s, i) {
      return (e /= i / 2) < 1
        ? (s / 2) * e * e * e * e + t
        : (-s / 2) * ((e -= 2) * e * e * e - 2) + t;
    },
  }),
  (Easing.quintic = {
    easeIn: function (e, t, s, i) {
      return s * (e /= i) * e * e * e * e + t;
    },
    easeOut: function (e, t, s, i) {
      return s * ((e = e / i - 1) * e * e * e * e + 1) + t;
    },
    easeInOut: function (e, t, s, i) {
      return (e /= i / 2) < 1
        ? (s / 2) * e * e * e * e * e + t
        : (s / 2) * ((e -= 2) * e * e * e * e + 2) + t;
    },
  }),
  (Easing.sine = {
    easeIn: function (e, t, s, i) {
      return -s * Math.cos((e / i) * (Math.PI / 2)) + s + t;
    },
    easeOut: function (e, t, s, i) {
      return s * Math.sin((e / i) * (Math.PI / 2)) + t;
    },
    easeInOut: function (e, t, s, i) {
      return (-s / 2) * (Math.cos((Math.PI * e) / i) - 1) + t;
    },
  }),
  (Easing.smoothstep = {
    easeIn: function (e, t, s, i) {
      var a = e / i / 2;
      return 2 * (a * a * (3 - 2 * a)) * s + t;
    },
    easeOut: function (e, t, s, i) {
      var a = (e / i + 1) / 2;
      return (2 * (a * a * (3 - 2 * a)) - 1) * s + t;
    },
    easeInOut: function (e, t, s, i) {
      var a = e / i;
      return a * a * (3 - 2 * a) * s + t;
    },
  }),
  Utils.extend(Tween, EventsProxy),
  (Tween.prototype.onchange = null),
  (Tween.prototype.onfinish = null),
  (Tween.prototype.onrewind = null),
  (Tween.prototype.play = function () {
    return (this.playing = !0), this.tick(0), this;
  }),
  (Tween.prototype.pause = function () {
    return (this.playing = !1), this;
  }),
  (Tween.prototype.rewind = function () {
    return (this._pos = -1), this;
  }),
  (Tween.prototype.forward = function () {
    return (this._pos = this.duration), this;
  }),
  (Tween.prototype.stop = function () {
    return this.pause(), this.rewind(), this;
  }),
  (Tween.prototype.updateValue = function (e) {
    return this.obj ? (this.obj[this.prop] = e) : (this.prop = e), this;
  }),
  (Tween.prototype.tick = function (e) {
    if (!this.playing) return !1;
    if (
      (e || (e = 0),
      Tween.STEP_TYPE == Tween.STEP_BY_FRAME ? this._pos++ : (this._pos += e),
      this._pos < 0)
    )
      return !1;
    if (this._pos > this.duration) {
      if (!this.autoRewind) return this.finish();
      (this._pos -= this.duration),
        this.hasEventListener("rewind") &&
          this.dispatchEvent("rewind", { target: this, value: this._pos });
    }
    var t =
      this.start == this.end
        ? 1 * this.start
        : this.callback(
            this._pos,
            this.start,
            this.end - this.start,
            this.duration
          );
    return (
      this.updateValue(t),
      this.hasEventListener("change") &&
        this.dispatchEvent("change", { target: this, value: t }),
      !1
    );
  }),
  (Tween.prototype.finish = function () {
    return (
      this.stop(),
      this.updateValue(this.end),
      !(
        this.hasEventListener("finish") &&
        this.dispatchEvent("finish", { target: this, value: this.end }) === !1
      )
    );
  }),
  (Tween.STEP_BY_FRAME = 0),
  (Tween.STEP_BY_TIME = 1),
  (Tween.STEP_TYPE = Tween.STEP_BY_FRAME),
  Utils.extend(DisplayObjectContainer, EventsProxy),
  (DisplayObjectContainer.prototype.objectsCounter = 0),
  (DisplayObjectContainer.prototype.scaleX = 1),
  (DisplayObjectContainer.prototype.scaleY = 1),
  (DisplayObjectContainer.prototype.opacity = 1),
  (DisplayObjectContainer.prototype.x = 0),
  (DisplayObjectContainer.prototype.y = 0),
  (DisplayObjectContainer.prototype.width = 0),
  (DisplayObjectContainer.prototype.height = 0),
  (DisplayObjectContainer.prototype.skewX = 0),
  (DisplayObjectContainer.prototype.skewY = 0),
  (DisplayObjectContainer.prototype.rotation = 0),
  (DisplayObjectContainer.prototype.parent = null),
  (DisplayObjectContainer.prototype.cropChildren = !1),
  (DisplayObjectContainer.prototype.hitArea = null),
  (DisplayObjectContainer.prototype.fillColor = null),
  (DisplayObjectContainer.prototype.fillLinearGradient = null),
  (DisplayObjectContainer.prototype.fillRadialGradient = null),
  (DisplayObjectContainer.prototype.fillPattern = null),
  (DisplayObjectContainer.prototype.getAbsoluteRotation = function () {
    return (
      this.rotation + (this.parent ? this.parent.getAbsoluteRotation() : 0)
    );
  }),
  (DisplayObjectContainer.prototype.getAbsoluteOpacity = function () {
    return this.opacity * (this.parent ? this.parent.getAbsoluteOpacity() : 1);
  }),
  (DisplayObjectContainer.prototype.getAbsoluteScaleX = function () {
    return this.scaleX * (this.parent ? this.parent.getAbsoluteScaleX() : 1);
  }),
  (DisplayObjectContainer.prototype.getAbsoluteScaleY = function () {
    return this.scaleY * (this.parent ? this.parent.getAbsoluteScaleY() : 1);
  }),
  (DisplayObjectContainer.prototype.getAbsoluteSkewX = function () {
    return this.skewX + (this.parent ? this.parent.getAbsoluteSkewX() : 0);
  }),
  (DisplayObjectContainer.prototype.getAbsoluteSkewY = function () {
    return this.skewY + (this.parent ? this.parent.getAbsoluteSkewY() : 0);
  }),
  (DisplayObjectContainer.prototype.getTransformProps = function () {
    return {
      x: this.x,
      y: this.y,
      scaleX: this.scaleX,
      scaleY: this.scaleY,
      skewX: this.skewX,
      skewY: this.skewY,
      rotation: this.rotation,
    };
  }),
  (DisplayObjectContainer.prototype.setTransformProps = function (e) {
    for (var t in e) this[t] = e[t];
  }),
  (DisplayObjectContainer.prototype.prepareCanvas = function (e) {
    var t = e.getContext("2d");
    t.save();
    var s = this.x,
      i = this.y;
    this.ignoreViewport ||
      this.parent != this.stage ||
      ((s -= this.stage.viewport.x), (i -= this.stage.viewport.y)),
      (s *= Utils.globalScale),
      (i *= Utils.globalScale),
      t.transform(1, this.skewX, this.skewY, 1, s, i),
      t.rotate(this.rotation),
      t.scale(this.scaleX, this.scaleY),
      (t.globalAlpha = this.getAbsoluteOpacity());
  }),
  (DisplayObjectContainer.prototype.moveCanvasAnchor = function (e, t) {
    var s = t ? 1 : -1;
    (0 == this.anchor.x && 0 == this.anchor.y) ||
      e
        .getContext("2d")
        .translate(
          this.anchor.x * Utils.globalScale * s,
          this.anchor.y * Utils.globalScale * s
        );
  }),
  (DisplayObjectContainer.prototype.restoreCanvas = function (e) {
    e.getContext("2d").restore();
  }),
  (DisplayObjectContainer.prototype.prepareCanvasShadow = function (e, t) {
    if (this.shadowColor) {
      var s = e.getContext("2d");
      if ((t || s.save(), 0 != this.rotation)) {
        var i =
            Math.sqrt(
              this.shadowOffsetX * this.shadowOffsetX +
                this.shadowOffsetY +
                this.shadowOffsetY
            ) * Utils.globalScale,
          a =
            Math.atan2(this.shadowOffsetY, this.shadowOffsetX) + this.rotation;
        (s.shadowOffsetX = Math.cos(a) * i),
          (s.shadowOffsetY = Math.sin(a) * i);
      } else
        (s.shadowOffsetX = this.shadowOffsetX * Utils.globalScale),
          (s.shadowOffsetY = this.shadowOffsetY * Utils.globalScale);
      (s.shadowColor = this.shadowColor),
        (s.shadowBlur = this.shadowBlur * Utils.globalScale);
    }
  }),
  (DisplayObjectContainer.prototype.restoreCanvasShadow = function (e) {
    this.shadowColor && this.restoreCanvas(e);
  }),
  (DisplayObjectContainer.prototype.render = function (e, t, s) {
    var i =
      this.visible && this.objects.length && this.cropChildren && this.stage;
    if (i) {
      var a = e;
      e = this.stage.transformBuffer;
      var r = this.getAbsolutePosition(),
        o = r.x,
        n = r.y;
      this.ignoreViewport ||
        this.parent != this.stage ||
        ((o -= this.stage.viewport.x), (n -= this.stage.viewport.y)),
        (o *= Utils.globalScale),
        (n *= Utils.globalScale);
      var h = e.getContext("2d");
      h.save(),
        h.transform(1, 0, 0, 1, o, n),
        h.clearRect(
          (-this.width / 2 - this.anchor.x) * Utils.globalScale - 1,
          (-this.height / 2 - this.anchor.y) * Utils.globalScale - 1,
          this.width * Utils.globalScale + 2,
          this.height * Utils.globalScale + 2
        );
    }
    for (var l = 0; l < this.objects.length; l++) {
      var p = this.objects[l];
      p.destroy ? (this.removeChild(p), l--) : p.visible && p.render(e, t, s);
    }
    i &&
      (a
        .getContext("2d")
        .drawImage(
          e,
          (r.x - this.anchor.x - this.width / 2) * Utils.globalScale,
          (r.y - this.anchor.y - this.height / 2) * Utils.globalScale,
          this.width * Utils.globalScale,
          this.height * Utils.globalScale,
          (-this.width / 2 - this.anchor.x) * Utils.globalScale,
          (-this.height / 2 - this.anchor.y) * Utils.globalScale,
          this.width * Utils.globalScale,
          this.height * Utils.globalScale
        ),
      e.getContext("2d").restore());
  }),
  (DisplayObjectContainer.prototype.getX = function () {
    return Math.round(this.x * Utils.globalScale);
  }),
  (DisplayObjectContainer.prototype.getY = function () {
    return Math.round(this.y * Utils.globalScale);
  }),
  (DisplayObjectContainer.prototype.getWidth = function () {
    return this.width * Math.abs(this.getAbsoluteScaleX()) * Utils.globalScale;
  }),
  (DisplayObjectContainer.prototype.getHeight = function () {
    return this.height * Math.abs(this.getAbsoluteScaleY()) * Utils.globalScale;
  }),
  (DisplayObjectContainer.prototype.getPosition = function () {
    return { x: this.x, y: this.y };
  }),
  (DisplayObjectContainer.prototype.setPosition = function (e, t) {
    return "undefined" == typeof t &&
      "undefined" != typeof e.x &&
      "undefined" != typeof e.y
      ? this.setPosition(e.x, e.y)
      : ((this.x = parseFloat(e)), void (this.y = parseFloat(t)));
  }),
  (DisplayObjectContainer.prototype.setPropScale = function (e) {
    this.scaleX = this.scaleY = 1 * e;
  }),
  (DisplayObjectContainer.prototype.getAnchor = function () {
    return this.anchor;
  }),
  (DisplayObjectContainer.prototype.setAnchor = function (e, t) {
    return "undefined" == typeof t &&
      "undefined" != typeof e.x &&
      "undefined" != typeof e.y
      ? this.setAnchor(e.x, e.y)
      : ((this.anchor.x = parseFloat(e)), void (this.anchor.y = parseFloat(t)));
  }),
  (DisplayObjectContainer.prototype.alignAnchor = function (e, t) {
    return (
      (e = parseInt(e)),
      isNaN(e) && (e = DisplayObjectContainer.ANCHOR_ALIGN_CENTER),
      0 > e && (e = DisplayObjectContainer.ANCHOR_ALIGN_LEFT),
      e > 0 && (e = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT),
      (t = parseInt(t)),
      isNaN(t) && (t = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE),
      0 > t && (t = DisplayObjectContainer.ANCHOR_VALIGN_TOP),
      t > 0 && (t = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM),
      (this.anchor.x = (this.width * e) / 2),
      (this.anchor.y = (this.height * t) / 2),
      this.getAnchor()
    );
  }),
  (DisplayObjectContainer.prototype.getAbsoluteAnchor = function () {
    return this.getPosition();
  }),
  (DisplayObjectContainer.prototype.getRelativeCenter = function () {
    var e = this.getAnchor(),
      t = this.getAbsoluteRotation(),
      s = { x: e.x, y: e.y };
    return (
      0 == t || (0 == s.x && 0 == s.y)
        ? ((s.x = -(s.x * this.getAbsoluteScaleX())),
          (s.y = -(s.y * this.getAbsoluteScaleY())))
        : ((s = new Vector(
            -s.x * this.getAbsoluteScaleX(),
            -s.y * this.getAbsoluteScaleY()
          )),
          s.rotate(-t)),
      s
    );
  }),
  (DisplayObjectContainer.prototype.getAbsolutePosition = function () {
    var e = { x: this.x, y: this.y };
    if (this.parent) {
      var t = this.parent.getAbsolutePosition(),
        s = this.parent.getAbsoluteRotation();
      if (0 != s) {
        var i = new Vector(
          e.x * this.parent.getAbsoluteScaleX(),
          e.y * this.parent.getAbsoluteScaleY()
        );
        i.rotate(-s), (e.x = t.x + i.x), (e.y = t.y + i.y);
      } else
        (e.x = t.x + e.x * this.parent.getAbsoluteScaleX()),
          (e.y = t.y + e.y * this.parent.getAbsoluteScaleY());
    }
    return e;
  }),
  (DisplayObjectContainer.prototype.getAbsoluteCenter = function () {
    var e = this.getAbsolutePosition(),
      t = this.getRelativeCenter();
    return (e.x += t.x), (e.y += t.y), e;
  }),
  (DisplayObjectContainer.prototype.getCenter = function () {
    return this.getAbsoluteCenter();
  }),
  (DisplayObjectContainer.prototype.getIgnoreViewport = function () {
    return (
      this.ignoreViewport || (this.parent && this.parent.getIgnoreViewport())
    );
  }),
  (DisplayObjectContainer.prototype.getHitAreaRectangle = function () {
    if (!this.hitArea) return this.getDrawRectangle();
    this.hitArea.rotation || (this.hitArea.rotation = 0);
    var e = this.getAbsoluteRotation() + this.hitArea.rotation,
      t = this.getAbsoluteScaleX(),
      s = this.getAbsoluteScaleY(),
      i = this.getCenter(),
      a = new Rectangle(
        0,
        0,
        this.hitArea.width * Math.abs(t),
        this.hitArea.height * Math.abs(s),
        e
      );
    if (0 != e) {
      var r = new Vector(this.hitArea.x * t, this.hitArea.y * s);
      r.rotate(-e), a.move(i.x + r.x, i.y + r.y);
    } else a.move(i.x + this.hitArea.x * t, i.y + this.hitArea.x * s);
    return a;
  }),
  (DisplayObjectContainer.prototype.getDrawRectangle = function () {
    var e = this.getCenter(),
      t = new Rectangle(
        0,
        0,
        this.width * Math.abs(this.getAbsoluteScaleX()),
        this.height * Math.abs(this.getAbsoluteScaleY()),
        this.getAbsoluteRotation()
      );
    return t.move(e.x, e.y), t;
  }),
  (DisplayObjectContainer.prototype.getAABBRectangle = function () {
    var e = this.getDrawRectangle(),
      t = e.AABB[1].x - e.AABB[0].x,
      s = e.AABB[1].y - e.AABB[0].y;
    return new Rectangle(e.AABB[0].x + t / 2, e.AABB[0].y + s / 2, t, s, 0);
  }),
  (DisplayObjectContainer.prototype.getFullAABBRectangle = function () {
    for (var e = [this.getAABBRectangle()], t = 0; t < this.objects.length; t++)
      e.push(this.objects[t].getFullAABBRectangle());
    var s = [
      { x: Number.MAX_VALUE, y: Number.MAX_VALUE },
      { x: Number.MIN_VALUE, y: Number.MIN_VALUE },
    ];
    for (t = 0; t < e.length; t++) {
      var i = e[t];
      (s[0].x = Math.min(s[0].x, i.AABB[0].x)),
        (s[0].y = Math.min(s[0].y, i.AABB[0].y)),
        (s[1].x = Math.max(s[1].x, i.AABB[1].x)),
        (s[1].y = Math.max(s[1].y, i.AABB[1].y));
    }
    var a = s[1].x - s[0].x,
      r = s[1].y - s[0].y;
    return new Rectangle(s[0].x + a / 2, s[0].y + r / 2, a, r, 0);
  }),
  (DisplayObjectContainer.prototype.cacheAsBitmap = function () {
    var e = this.x,
      t = this.y,
      s = this.rotation,
      i = this.parent;
    (this.rotation = 0), (this.parent = null);
    var a = this.getAABBRectangle(),
      r = this.getFullAABBRectangle();
    (this.x =
      a.AABB[0].x -
      r.AABB[0].x +
      (this.width / 2 + this.anchor.x) * this.scaleX),
      (this.y =
        a.AABB[0].y -
        r.AABB[0].y +
        (this.height / 2 + this.anchor.y) * this.scaleY);
    var o = document.createElement("canvas");
    return (
      (o.width = r.width * Utils.globalScale),
      (o.height = r.height * Utils.globalScale),
      this.render(o, !0, 0),
      this.render(o, !1, 0),
      (this.parent = i),
      (this.x = e),
      (this.y = t),
      (this.rotation = s),
      o
    );
  }),
  (DisplayObjectContainer.prototype.localToGlobal = function (e, t) {
    var s =
      "object" == typeof e &&
      "undefined" != typeof e.x &&
      "undefined" != typeof e.y
        ? new Vector(e.x + 0, e.y + 0)
        : new Vector(e, t);
    return (
      s.rotate(this.getAbsoluteRotation()).add(this.getAbsolutePosition()), s
    );
  }),
  (DisplayObjectContainer.prototype.globalToLocal = function (e, t) {
    var s =
      "object" == typeof e &&
      "undefined" != typeof e.x &&
      "undefined" != typeof e.y
        ? new Vector(e.x + 0, e.y + 0)
        : new Vector(e, t);
    return (
      s.subtract(this.getAbsolutePosition()).rotate(this.getAbsoluteRotation()),
      s
    );
  }),
  (DisplayObjectContainer.prototype.localToLocal = function (e, t, s) {
    return s.globalToLocal(this.localToGlobal(e, t));
  }),
  (DisplayObjectContainer.prototype.swapChildren = function (e, t) {
    var s = e.zIndex;
    e.setZIndex(t.zIndex), t.setZIndex(s);
  }),
  (DisplayObjectContainer.prototype.findMaxZIndex = function () {
    for (var e = -1, t = !1, s = 0; s < this.objects.length; s++)
      this.objects[s].zIndex > e && ((e = this.objects[s].zIndex), (t = s));
    return { index: t, zIndex: e };
  }),
  (DisplayObjectContainer.prototype.findMinZIndex = function () {
    for (var e = -1, t = !1, s = 0; s < this.objects.length; s++)
      0 == s && ((e = this.objects[s].zIndex), (t = 0)),
        this.objects[s].zIndex < e && ((e = this.objects[s].zIndex), (t = s));
    return { index: t, zIndex: e };
  }),
  (DisplayObjectContainer.prototype.addChild = function (e) {
    var t = this.findMaxZIndex(),
      s = e.zIndex;
    return (
      t.index !== !1 ? (e.zIndex = t.zIndex + 1) : (e.zIndex = 0),
      this.objectsCounter++,
      (e.uid = this.objectsCounter),
      (e.parent = this),
      e.setStage(this.stage),
      this.objects.push(e),
      0 != s && this.setChildZIndex(e, ~~s),
      e.hasEventListener("add") && e.dispatchEvent("add", { target: e }),
      e
    );
  }),
  (DisplayObjectContainer.prototype.addChildAt = function (e, t) {
    return this.addChild(e), this.setChildZIndex(e, ~~t), e;
  }),
  (DisplayObjectContainer.prototype.contains = function (e, t) {
    for (var s = 0; s < this.objects.length; s++) {
      if (this.objects[s] == e) return !0;
      if (t && this.objects[s].contains(e, t)) return !0;
    }
    return !1;
  }),
  (DisplayObjectContainer.prototype.setStage = function (e) {
    this.stage = e;
    for (var t = 0; t < this.objects.length; t++) this.objects[t].setStage(e);
  }),
  (DisplayObjectContainer.prototype.removeChild = function (e) {
    e &&
      this.objects.indexOf(e) >= 0 &&
      (e.stage && e.stage.clearObjectTweens(e),
      e.clear(),
      e.hasEventListener("remove") && e.dispatchEvent("remove", { target: e }),
      e.removeAllEventListeners(),
      (e.parent = null),
      (e.stage = null),
      (this.objects = Utils.removeFromArray(this.objects, e)));
  }),
  (DisplayObjectContainer.prototype.setChildZIndex = function (e, t) {
    (e.zIndex = t),
      (this.objects = this.objects.sort(function (e, t) {
        return e.zIndex == t.zIndex
          ? e.uid > t.uid
            ? 1
            : -1
          : e.zIndex > t.zIndex
          ? 1
          : -1;
      }));
  }),
  (DisplayObjectContainer.prototype.getHitArea = function () {
    return this.hitArea
      ? (this.hitArea.rotation || (this.hitArea.rotation = 0), this.hitArea)
      : { x: 0, y: 0, width: this.width, height: this.height, rotation: 0 };
  }),
  (DisplayObjectContainer.prototype.hitTest = function (e, t) {
    if (
      (t || (t = this),
      0 == e.getAbsoluteRotation() && 0 == t.getAbsoluteRotation())
    ) {
      var s = e.getCenter(),
        i = t.getCenter(),
        a = e.width * Math.abs(e.getAbsoluteScaleX()),
        r = e.height * Math.abs(e.getAbsoluteScaleY()),
        o = t.width * Math.abs(t.getAbsoluteScaleX()),
        n = t.height * Math.abs(t.getAbsoluteScaleY()),
        h = s.x - a / 2,
        l = s.y - r / 2,
        p = i.x - o / 2,
        d = i.y - n / 2,
        c = Math.max(l, d),
        u = Math.max(h, p),
        g = Math.min(h + a, p + o),
        f = Math.min(l + r, d + n),
        m = g - u,
        y = f - c;
      return m > 0 && y > 0;
    }
    var x = e.getDrawRectangle(),
      v = t.getDrawRectangle();
    return x.hitTestRectangle(v);
  }),
  (DisplayObjectContainer.prototype.hitTestPointObject = function (
    e,
    t,
    s,
    i,
    a
  ) {
    var r, o, n, h, l, p, d, c, u;
    "boolean" == typeof e.pixelCheck && (i = e.pixelCheck);
    var g = e.getHitArea();
    (n = g.width * Math.abs(e.getAbsoluteScaleX())),
      (h = g.height * Math.abs(e.getAbsoluteScaleY()));
    var f = e.getAbsoluteCenter();
    if (
      ((r = f.x + g.x - n / 2),
      (o = f.y + g.y - h / 2),
      (l = t),
      (p = s),
      e.ignoreViewport ||
        ((l += this.stage.viewport.x), (p += this.stage.viewport.y)),
      (c = !1),
      e.getAbsoluteRotation() + g.rotation == 0
        ? l >= r && p >= o && r + n >= l && o + h >= p && (c = !0)
        : ((d = e.getHitAreaRectangle()),
          d.hitTestPoint(new Vector(l, p)) && (c = !0)),
      c && i)
    ) {
      (this.stage.buffer.width = this.stage.canvas.width),
        (this.stage.buffer.height = this.stage.canvas.height),
        this.stage.clearScreen(this.stage.buffer);
      var m = e.getTransformProps(),
        y = e.parent,
        x = e.getAbsolutePosition();
      (e.x = x.x),
        (e.y = x.y),
        (e.scaleX = e.getAbsoluteScaleX()),
        (e.scaleY = e.getAbsoluteScaleY()),
        (e.skewX = e.getAbsoluteSkewX()),
        (e.skewY = e.getAbsoluteSkewY()),
        (e.rotation = e.getAbsoluteRotation()),
        (e.parent = null),
        e.render(this.stage.buffer, e["static"], 0);
      var v = Math.floor(t * Utils.globalScale),
        w = Math.floor(s * Utils.globalScale);
      (u = this.stage.buffer.getContext("2d").getImageData(v, w, 1, 1)),
        0 == u.data[3] && (c = !1),
        e.setTransformProps(m),
        (e.parent = y);
    }
    return !c && a && e.dragged && (c = !0), c;
  }),
  (DisplayObjectContainer.prototype.getObjectsStackByCoord = function (
    e,
    t,
    s,
    i
  ) {
    for (var a, r = [], o = this.objects.length - 1; o >= 0; o--)
      this.objects[o].visible &&
        ((a = this.objects[o]),
        a.objects &&
          a.objects.length &&
          (r = r.concat(a.getObjectsStackByCoord(e, t, s, i))),
        this.hitTestPointObject(a, e, t, s, i) && r.push(a));
    return r;
  }),
  (DisplayObjectContainer.prototype.getObjectsUnderPoint = function (e, t, s) {
    var i = this.getAbsolutePosition();
    return this.getObjectsStackByCoord(i.x + e, i.y + t, !!s);
  }),
  (DisplayObjectContainer.prototype.getObjectUnderPoint = function (e, t, s) {
    var i = this.getObjectsUnderPoint(e, t, s);
    return i[0];
  }),
  (DisplayObjectContainer.prototype.doDrag = function (e, t) {
    for (var s = 0; s < this.objects.length; s++) this.objects[s].doDrag(e, t);
    if (this.dragged) {
      var i = e,
        a = t;
      this.ignoreViewport ||
        ((i += this.stage.viewport.x), (a += this.stage.viewport.y)),
        (i -= this.dragX),
        (a -= this.dragY);
      var r = this.parent.globalToLocal(i, a);
      (this.x = r.x), (this.y = r.y);
    }
  }),
  (DisplayObjectContainer.prototype.checkMouseOut = function (e, t) {
    for (var s = this.objects.length - 1; s >= 0; s--)
      if (this.objects[s].checkMouseOut(e, t) === !1) return;
    if (this.mouseOn && e.indexOf(this) < 0) {
      this.mouseOn = !1;
      var i = this.stage.finalizeMouseCoords(this, t);
      return this.dispatchEvent("mouseout", { target: this, x: i.x, y: i.y });
    }
  }),
  (DisplayObjectContainer.prototype.getMaxZIndexInStack = function (e) {
    for (var t = -1, s = 0, i = 0; i < e.length; i++)
      e[i].zIndex > t && ((t = e[i].zIndex), (s = i));
    return s;
  }),
  (DisplayObjectContainer.prototype.sortStack = function (e, t) {
    return e.sort(function (e, s) {
      return e.zIndex == s.zIndex
        ? t
          ? e.uid < s.uid
            ? 1
            : -1
          : e.uid > s.uid
          ? 1
          : -1
        : t
        ? e.zIndex < s.zIndex
          ? 1
          : -1
        : e.zIndex > s.zIndex
        ? 1
        : -1;
    });
  }),
  (DisplayObjectContainer.prototype.clear = function () {
    for (; this.objects.length; ) this.removeChild(this.objects[0]);
  }),
  (DisplayObjectContainer.prototype.getFillStyle = function (e) {
    var t,
      s = null;
    if (this.fillLinearGradient) {
      t = e
        .getContext("2d")
        .createLinearGradient(
          this.fillLinearGradient.x0 * Utils.globalScale,
          this.fillLinearGradient.y0 * Utils.globalScale,
          this.fillLinearGradient.x1 * Utils.globalScale,
          this.fillLinearGradient.y1 * Utils.globalScale
        );
      for (var i = 0; i < this.fillLinearGradient.points.length; i++)
        t.addColorStop(
          this.fillLinearGradient.points[i].point,
          this.fillLinearGradient.points[i].color
        );
      s = t;
    } else if (this.fillRadialGradient) {
      for (
        t = e
          .getContext("2d")
          .createRadialGradient(
            this.fillRadialGradient.x0 * Utils.globalScale,
            this.fillRadialGradient.y0 * Utils.globalScale,
            this.fillRadialGradient.r0 * Utils.globalScale,
            this.fillRadialGradient.x1 * Utils.globalScale,
            this.fillRadialGradient.y1 * Utils.globalScale,
            this.fillRadialGradient.r1 * Utils.globalScale
          ),
          i = 0;
        i < this.fillRadialGradient.points.length;
        i++
      )
        t.addColorStop(
          this.fillRadialGradient.points[i].point,
          this.fillRadialGradient.points[i].color
        );
      s = t;
    } else
      s = this.fillPattern
        ? e
            .getContext("2d")
            .createPattern(this.fillPattern.img, this.fillPattern.repeat)
        : this.fillColor;
    return s;
  }),
  (DisplayObjectContainer.prototype.set = function (e) {
    for (var t in e) this[t] = e[t];
  }),
  (DisplayObjectContainer.ANCHOR_ALIGN_LEFT = -1),
  (DisplayObjectContainer.ANCHOR_ALIGN_CENTER = 0),
  (DisplayObjectContainer.ANCHOR_ALIGN_RIGHT = 1),
  (DisplayObjectContainer.ANCHOR_VALIGN_TOP = -1),
  (DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE = 0),
  (DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM = 1);
var ANCHOR_ALIGN_LEFT = DisplayObjectContainer.ANCHOR_ALIGN_LEFT,
  ANCHOR_ALIGN_CENTER = DisplayObjectContainer.ANCHOR_ALIGN_CENTER,
  ANCHOR_ALIGN_RIGHT = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT,
  ANCHOR_VALIGN_TOP = DisplayObjectContainer.ANCHOR_VALIGN_TOP,
  ANCHOR_VALIGN_MIDDLE = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE,
  ANCHOR_VALIGN_BOTTOM = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM;
Utils.extend(DisplayObject, DisplayObjectContainer),
  (DisplayObject.prototype.uid = 0),
  (DisplayObject.prototype.stage = null),
  (DisplayObject.prototype.shadowColor = null),
  (DisplayObject.prototype.shadowOffsetX = 0),
  (DisplayObject.prototype.shadowOffsetY = 0),
  (DisplayObject.prototype.shadowBlur = 0),
  (DisplayObject.prototype.zIndex = 0),
  (DisplayObject.prototype.visible = !0),
  (DisplayObject.prototype["static"] = !1),
  (DisplayObject.prototype.ignoreViewport = !1),
  (DisplayObject.prototype.destroy = !1),
  (DisplayObject.prototype.dragged = !1),
  (DisplayObject.prototype.dragX = 0),
  (DisplayObject.prototype.dragY = 0),
  (DisplayObject.prototype.mouseOn = !1),
  (DisplayObject.prototype.allowDebugDrawing = !0),
  (DisplayObject.prototype.pixelCheck = null),
  (DisplayObject.prototype.onmouseover = null),
  (DisplayObject.prototype.onmouseout = null),
  (DisplayObject.prototype.onmousedown = null),
  (DisplayObject.prototype.onmouseup = null),
  (DisplayObject.prototype.onclick = null),
  (DisplayObject.prototype.oncontextmenu = null),
  (DisplayObject.prototype.onmousemove = null),
  (DisplayObject.prototype.onprerender = null),
  (DisplayObject.prototype.onenterframe = null),
  (DisplayObject.prototype.onrender = null),
  (DisplayObject.prototype.onadd = null),
  (DisplayObject.prototype.onremove = null),
  (DisplayObject.prototype.onbox2dsync = null),
  (DisplayObject.prototype.setStatic = function (e, t) {
    if (((e = Boolean(e)), !t))
      for (var s = 0; s < this.objects.length; s++)
        this.objects[s].setStatic(e);
    return this["static"] != e
      ? ((this["static"] = e), this.stage && this.stage.refreshBackground(), !0)
      : !1;
  }),
  (DisplayObject.prototype.startDrag = function (e, t) {
    (this.dragged = !0), (this.dragX = e), (this.dragY = t);
  }),
  (DisplayObject.prototype.stopDrag = function () {
    (this.dragged = !1), (this.dragX = 0), (this.dragY = 0);
  }),
  (DisplayObject.prototype.removeTweens = function () {
    this.stage && this.stage.clearObjectTweens(this);
  }),
  (DisplayObject.prototype.addTween = function (e, t, s, i, a, r) {
    if (!this.stage) return null;
    var o = this[e];
    if (isNaN(o)) return null;
    var n = this.stage.createTween(this, e, o, t, s, i);
    return (n.onchange = r), (n.onfinish = a), n;
  }),
  (DisplayObject.prototype.moveTo = function (e, t, s, i, a, r) {
    if (((s = ~~s), 0 >= s))
      return (
        this.setPosition(e, t),
        a && a({ target: new Tween(this, "y", t, t, s, i) }),
        this
      );
    var o,
      n = [];
    this.x != e && ((o = this.addTween("x", e, s, i)), o && n.push(o)),
      this.y != t && ((o = this.addTween("y", t, s, i)), o && n.push(o));
    var h = n.length;
    if (h > 0) {
      (n[h - 1].onchange = r), (n[h - 1].onfinish = a);
      for (var l = 0; h > l; l++) n[l].play();
    } else a && a({ target: new Tween(this, "y", t, t, s, i) });
    return this;
  }),
  (DisplayObject.prototype.moveBy = function (e, t, s, i, a, r) {
    return this.moveTo(this.x + e, this.y + t, s, i, a, r);
  }),
  (DisplayObject.prototype.fadeTo = function (e, t, s, i, a) {
    t = ~~t;
    var r = null;
    return (
      0 >= t
        ? (this.opacity = e)
        : this.opacity != e &&
          ((r = this.addTween("opacity", e, t, s, i, a)), r && r.play()),
      !r && i && i({ target: new Tween(this, "opacity", e, e, t, s) }),
      this
    );
  }),
  (DisplayObject.prototype.fadeBy = function (e, t, s, i, a) {
    var r = Math.max(0, Math.min(1, this.opacity + e));
    return this.fadeTo(r, t, s, i, a);
  }),
  (DisplayObject.prototype.rotateTo = function (e, t, s, i, a) {
    t = ~~t;
    var r = null;
    return (
      0 >= t
        ? (this.rotation = e)
        : ((r = this.addTween("rotation", e, t, s, i, a)), r && r.play()),
      !r && i && i({ target: new Tween(this, "rotation", e, e, t, s) }),
      this
    );
  }),
  (DisplayObject.prototype.rotateBy = function (e, t, s, i, a) {
    return this.rotateTo(this.rotation + e, t, s, i, a);
  }),
  (DisplayObject.prototype.skewXTo = function (e, t, s, i, a) {
    t = ~~t;
    var r = null;
    return (
      0 >= t
        ? (this.skewX = e)
        : ((r = this.addTween("skewX", e, t, s, i, a)), r && r.play()),
      !r &&
        i &&
        i({
          target: new Tween(this, "skewX", e, e, t, s),
        }),
      this
    );
  }),
  (DisplayObject.prototype.skewXBy = function (e, t, s, i, a) {
    return this.skewXTo(this.skewX + e, t, s, i, a);
  }),
  (DisplayObject.prototype.skewYTo = function (e, t, s, i, a) {
    t = ~~t;
    var r = null;
    return (
      0 >= t
        ? (this.skewY = e)
        : ((r = this.addTween("skewY", e, t, s, i, a)), r && r.play()),
      !r && i && i({ target: new Tween(this, "skewY", e, e, t, s) }),
      this
    );
  }),
  (DisplayObject.prototype.skewYBy = function (e, t, s, i, a) {
    return this.skewYTo(this.skewY + e, t, s, i, a);
  }),
  (DisplayObject.prototype.scaleTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t))
      return (
        (this.scaleX = this.scaleY = e),
        i && i({ target: new Tween(this, "scaleY", e, e, t, s) }),
        this
      );
    var r,
      o = [];
    this.scaleX != e &&
      ((r = this.addTween("scaleX", e, t, s)), r && o.push(r)),
      this.scaleY != e &&
        ((r = this.addTween("scaleY", e, t, s)), r && o.push(r));
    var n = o.length;
    if (n > 0) {
      (o[n - 1].onchange = a), (o[n - 1].onfinish = i);
      for (var h = 0; n > h; h++) o[h].play();
    } else i && i({ target: new Tween(this, "scaleY", e, e, t, s) });
    return this;
  }),
  (DisplayObject.prototype.setZIndex = function (e) {
    (this.zIndex = ~~e),
      this.parent && this.parent.setChildZIndex(this, this.zIndex);
  }),
  (DisplayObject.prototype.hitTestPoint = function (e, t, s, i) {
    return this.stage ? this.stage.hitTestPointObject(this, e, t, s, i) : !1;
  }),
  (DisplayObject.prototype.setRelativePosition = function (e, t, s, i) {
    switch (((e = e || 0), (t = t || 0), s)) {
      case "right":
        e = this.stage.screenWidth - e;
        break;
      case "left":
        break;
      default:
        e = this.stage.screenWidth / 2 + e;
    }
    switch (i) {
      case "bottom":
        t = this.stage.screenHeight - t;
        break;
      case "top":
        break;
      default:
        t = this.stage.screenHeight / 2 + t;
    }
    this.setPosition(e, t);
  }),
  (DisplayObject.prototype.debugDraw = function () {
    if (this.visible && this.allowDebugDrawing) {
      var e = this.getAbsolutePosition(),
        t = this.getCenter(),
        s = this.getDrawRectangle(),
        i = this.getAABBRectangle();
      stage.drawCircle(e.x, e.y, 1, 1, "rgba(255,0,0,0.9)"),
        stage.drawCircle(t.x, t.y, 1, 1, "rgba(0,255,0,0.9)"),
        stage.drawLine(e.x, e.y, t.x, t.y, 1, "rgba(255,255,255,0.5)"),
        stage.drawPolygon(s.vertices, 0.5, "rgba(255,0,255,0.5)", 1),
        stage.drawLine(
          i.vertices[0].x,
          i.vertices[0].y,
          i.vertices[2].x,
          i.vertices[2].y,
          1,
          "rgba(255,255,255,0.5)"
        ),
        stage.drawLine(
          i.vertices[2].x,
          i.vertices[0].y,
          i.vertices[0].x,
          i.vertices[2].y,
          1,
          "rgba(255,255,255,0.5)"
        ),
        stage.drawPolygon(i.vertices, 0.5, "rgba(255,255,255,0.5)");
    }
  }),
  (DisplayObject.prototype.fixChildrenParent = function () {
    for (var e = 0; e < this.objects.length; e++)
      (this.objects[e].parent = this), this.objects[e].fixChildrenParent();
  }),
  (DisplayObject.prototype.clone = function () {
    var e = Utils.clone(this);
    return e.fixChildrenParent(), e;
  }),
  (DisplayObject.prototype.safeRemove = function () {
    this.destroy = !0;
  }),
  Utils.extend(Graphics, DisplayObject),
  (Graphics.prototype.x = 0),
  (Graphics.prototype.y = 0),
  (Graphics.prototype.color = "#000"),
  (Graphics.prototype.lineWidth = 1),
  (Graphics.prototype.lineDash = null),
  (Graphics.prototype.render = function (e, t, s) {
    !!this["static"] == !!t &&
      this.hasEventListener("render") &&
      this.dispatchEvent("render", { target: this, canvas: e, delta: s }),
      Utils.callSuperMethod(Graphics, this, "render", e, t, s);
  }),
  (Graphics.prototype.preparePath = function (e) {
    this.moveCanvasAnchor(e), this.prepareCanvasShadow(e);
    var t = e.getContext("2d");
    if (
      (t.beginPath(),
      (t.strokeStyle = this.lineWidth > 0 ? this.color : "transparent"),
      (t.lineWidth = this.lineWidth * Utils.globalScale),
      (t.globalAlpha = this.getAbsoluteOpacity()),
      (t.fillStyle = this.getFillStyle(e)),
      this.lineDash && t.setLineDash)
    ) {
      for (var s = [], i = 0; i < this.lineDash.length; i++)
        s.push(this.lineDash[i] * Utils.globalScale);
      t.setLineDash(s);
    }
  }),
  (Graphics.prototype.removeShadow = function (e) {
    var t = e.getContext("2d");
    (t.shadowColor = ""),
      (t.shadowBlur = 0),
      (t.shadowOffsetX = 0),
      (t.shadowOffsetY = 0);
  }),
  (Graphics.prototype.finalizeCanvas = function (e) {
    var t = e.getContext("2d");
    (this.fillColor ||
      this.fillLinearGradient ||
      this.fillRadialGradient ||
      this.fillPattern) &&
      (t.fill(), this.color && this.lineWidth && this.removeShadow(e)),
      t.stroke(),
      this.restoreCanvasShadow(e),
      this.moveCanvasAnchor(e, !0);
  }),
  (Graphics.prototype.resetView = function () {
    (this.color = "transparent"),
      (this.fillColor = null),
      (this.fillLinearGradient = null),
      (this.fillRadialGradient = null),
      (this.fillPattern = null);
  }),
  (Graphics.circle = function (e, t, s) {
    Utils.callSuperConstructor(Graphics.circle, this),
      (this.x = e),
      (this.y = t),
      (this.radius = s),
      (this.width = 2 * s),
      (this.height = 2 * s);
  }),
  Utils.extend(Graphics.circle, Graphics),
  (Graphics.circle.prototype.render = function (e, t, s) {
    this.prepareCanvas(e),
      !!this["static"] == !!t &&
        0 != this.opacity &&
        (this.preparePath(e),
        e
          .getContext("2d")
          .arc(0, 0, this.radius * Utils.globalScale, 0, 2 * Math.PI),
        this.finalizeCanvas(e)),
      Utils.callSuperMethod(Graphics.circle, this, "render", e, t, s),
      this.restoreCanvas(e);
  }),
  (Graphics.line = function (e, t, s, i) {
    Utils.callSuperConstructor(Graphics.line, this),
      (this.x1 = e),
      (this.x2 = s),
      (this.y1 = t),
      (this.y2 = i);
  }),
  Utils.extend(Graphics.line, Graphics),
  (Graphics.line.prototype.render = function (e, t, s) {
    if ((this.prepareCanvas(e), !!this["static"] == !!t && 0 != this.opacity)) {
      this.preparePath(e);
      var i = e.getContext("2d");
      i.moveTo(this.x1 * Utils.globalScale, this.y1 * Utils.globalScale),
        i.lineTo(this.x2 * Utils.globalScale, this.y2 * Utils.globalScale),
        this.finalizeCanvas(e);
    }
    Utils.callSuperMethod(Graphics.line, this, "render", e, t, s),
      this.restoreCanvas(e);
  }),
  (Graphics.rectangle = function (e, t, s, i) {
    Utils.callSuperConstructor(Graphics.rectangle, this),
      (this.x = e),
      (this.y = t),
      (this.width = s),
      (this.height = i);
  }),
  Utils.extend(Graphics.rectangle, Graphics),
  (Graphics.rectangle.prototype.render = function (e, t, s) {
    this.prepareCanvas(e),
      !!this["static"] == !!t &&
        0 != this.opacity &&
        (this.preparePath(e),
        e
          .getContext("2d")
          .rect(
            (-this.width / 2) * Utils.globalScale,
            (-this.height / 2) * Utils.globalScale,
            this.width * Utils.globalScale,
            this.height * Utils.globalScale
          ),
        this.finalizeCanvas(e)),
      Utils.callSuperMethod(Graphics.rectangle, this, "render", e, t, s),
      this.restoreCanvas(e);
  }),
  (Graphics.arc = function (e, t, s, i, a, r) {
    Utils.callSuperConstructor(Graphics.arc, this),
      (this.x = e),
      (this.y = t),
      (this.radius = s),
      (this.startAngle = i),
      (this.endAngle = a),
      (this.antiClockWise = r),
      (this.width = 2 * s),
      (this.height = 2 * s);
  }),
  Utils.extend(Graphics.arc, Graphics),
  (Graphics.arc.prototype.render = function (e, t, s) {
    this.prepareCanvas(e),
      !!this["static"] == !!t &&
        0 != this.opacity &&
        (this.preparePath(e),
        e
          .getContext("2d")
          .arc(
            0,
            0,
            this.radius * Utils.globalScale,
            this.startAngle,
            this.endAngle,
            this.antiClockWise
          ),
        this.finalizeCanvas(e)),
      Utils.callSuperMethod(Graphics.arc, this, "render", e, t, s),
      this.restoreCanvas(e);
  }),
  (Graphics.polygon = function (e) {
    if (!e || e.length < 2) throw Error("Invalid parameters");
    Utils.callSuperConstructor(Graphics.polygon, this), (this.points = e);
    for (
      var t = Number.MAX_VALUE,
        s = Number.MAX_VALUE,
        i = Number.MIN_VALUE,
        a = Number.MIN_VALUE,
        r = 0;
      r < e.length;
      r++
    )
      e[r].x < t && (t = e[r].x),
        e[r].y < s && (s = e[r].y),
        e[r].x > i && (i = e[r].x),
        e[r].y > a && (a = e[r].y);
    (this.width = i - t), (this.height = a - s);
  }),
  Utils.extend(Graphics.polygon, Graphics),
  (Graphics.polygon.prototype.render = function (e, t, s) {
    if ((this.prepareCanvas(e), !!this["static"] == !!t && 0 != this.opacity)) {
      this.preparePath(e);
      var i = e.getContext("2d");
      i.moveTo(
        this.points[0].x * Utils.globalScale,
        this.points[0].y * Utils.globalScale
      );
      for (var a = 1; a < this.points.length; a++)
        i.lineTo(
          this.points[a].x * Utils.globalScale,
          this.points[a].y * Utils.globalScale
        );
      i.lineTo(
        this.points[0].x * Utils.globalScale,
        this.points[0].y * Utils.globalScale
      ),
        this.finalizeCanvas(e);
    }
    Utils.callSuperMethod(Graphics.polygon, this, "render", e, t, s),
      this.restoreCanvas(e);
  }),
  (Graphics.text = function (e, t, s) {
    Utils.callSuperConstructor(Graphics.text, this),
      (this.x = e),
      (this.y = t),
      (this.text = s),
      (this.align = Graphics.text.ALIGN_LEFT),
      (this.valign = Graphics.text.VALIGN_MIDDLE),
      (this.style = "normal"),
      (this.size = 10),
      (this.font = "sans-serif"),
      (this.lineHeight = 10),
      (this.maxWidth = 0),
      (this.maxWidthType = Graphics.text.MAX_WIDTH_WORD_WRAP),
      (this.fitToParent = !1);
  }),
  Utils.extend(Graphics.text, Graphics),
  (Graphics.text.ALIGN_LEFT = "left"),
  (Graphics.text.ALIGN_CENTER = "center"),
  (Graphics.text.ALIGN_RIGHT = "right"),
  (Graphics.text.VALIGN_TOP = "top"),
  (Graphics.text.VALIGN_MIDDLE = "middle"),
  (Graphics.text.VALIGN_BOTTOM = "bottom"),
  (Graphics.text.MAX_WIDTH_WORD_WRAP = 0),
  (Graphics.text.MAX_WIDTH_FIT = 1),
  (Graphics.text.LINES_DELIMITER = "\n"),
  (Graphics.text.prototype.preparePath = function (e) {
    Utils.callSuperMethod(Graphics.text, this, "preparePath", e);
    var t = e.getContext("2d");
    (t.font =
      this.style +
      " " +
      Math.floor(this.size * Utils.globalScale) +
      "px " +
      this.font),
      (t.textAlign = this.align),
      (t.textBaseline = this.valign);
  }),
  (Graphics.text.prototype.getRect = function (e, t, s) {
    s || (this.prepareCanvas(e), this.preparePath(e)), t || (t = this.text);
    var i = e.getContext("2d").measureText(t);
    return s || (this.finalizeCanvas(e), this.restoreCanvas(e)), i;
  }),
  (Graphics.text.prototype.getLines = function (e) {
    var t,
      s,
      i,
      a,
      r,
      o,
      n = this.text + "",
      h = this.maxWidth;
    if (
      (this.fitToParent &&
        (0 == h || this.parent.width < h) &&
        (h = this.parent.width),
      h > 0 && this.maxWidthType == Graphics.text.MAX_WIDTH_WORD_WRAP)
    ) {
      for (
        a = n.split(Graphics.text.LINES_DELIMITER), r = [], o = [], s = 0;
        s < a.length;
        s++
      ) {
        for (i = a[s].split(" "), o = [i[0]], t = 1; t < i.length; t++)
          this.getRect(e, o.join(" ") + " " + i[t], !0).width /
            Utils.globalScale >
          h
            ? (r.push(o.join(" ")), (o = [i[t]]))
            : o.push(i[t]);
        r.push(o.join(" "));
      }
      n = r.join(Graphics.text.LINES_DELIMITER);
    }
    return (r = n.split(Graphics.text.LINES_DELIMITER));
  }),
  (Graphics.text.prototype.render = function (e, t, s) {
    if (
      (this.prepareCanvas(e),
      !!this["static"] == !!t && 0 != this.opacity && this.text)
    ) {
      this.preparePath(e);
      var i = this.getLines(e),
        a = 0;
      this.valign == Graphics.text.VALIGN_MIDDLE &&
        i.length > 1 &&
        (a = -(i.length * this.lineHeight) / 2),
        this.valign == Graphics.text.VALIGN_BOTTOM &&
          i.length > 1 &&
          (a = -(i.length * this.lineHeight)),
        (a *= Utils.globalScale);
      var r = 0;
      this.maxWidthType == Graphics.text.MAX_WIDTH_FIT &&
        ((r = this.maxWidth),
        this.fitToParent &&
          (0 == r || this.parent.width < r) &&
          (r = this.parent.width)),
        (r *= Utils.globalScale);
      for (var o = 0; o < i.length; o++) {
        var n = e.getContext("2d");
        (this.fillColor ||
          this.fillLinearGradient ||
          this.fillRadialGradient ||
          this.fillPattern) &&
          (r
            ? n.fillText(
                i[o],
                0,
                a + o * this.lineHeight * Utils.globalScale,
                r
              )
            : n.fillText(i[o], 0, a + o * this.lineHeight * Utils.globalScale)),
          this.color &&
            this.lineWidth > 0 &&
            (this.removeShadow(e),
            r
              ? n.strokeText(
                  i[o],
                  0,
                  a + o * this.lineHeight * Utils.globalScale,
                  r
                )
              : n.strokeText(
                  i[o],
                  0,
                  a + o * this.lineHeight * Utils.globalScale
                ),
            this.prepareCanvasShadow(e, !0));
      }
      this.finalizeCanvas(e);
    }
    Utils.callSuperMethod(Graphics.text, this, "render", e, t, s),
      this.restoreCanvas(e);
  }),
  (Graphics.free = function () {
    (this.commands = []), Utils.callSuperConstructor(Graphics.free, this);
  }),
  Utils.extend(Graphics.free, Graphics),
  (Graphics.free.prototype.clear = function () {
    (this.commands = []), Utils.callSuperMethod(Graphics.free, this, "clear");
  }),
  (Graphics.free.prototype.beginPath = function () {
    return this.commands.push({ command: "beginPath" }), this;
  }),
  (Graphics.free.prototype.stroke = function () {
    return this.commands.push({ command: "stroke" }), this;
  }),
  (Graphics.free.prototype.setStrokeStyle = function (e) {
    return this.commands.push({ command: "setStrokeStyle", style: e }), this;
  }),
  (Graphics.free.prototype.setFillStyle = function (e) {
    return this.commands.push({ command: "setFillStyle", style: e }), this;
  }),
  (Graphics.free.prototype.fill = function () {
    return this.commands.push({ command: "fill" }), this;
  }),
  (Graphics.free.prototype.moveTo = function (e, t) {
    return this.commands.push({ command: "moveTo", x: e, y: t }), this;
  }),
  (Graphics.free.prototype.lineTo = function (e, t) {
    return this.commands.push({ command: "lineTo", x: e, y: t }), this;
  }),
  (Graphics.free.prototype.arc = function (e, t, s, i, a, r) {
    return (
      this.commands.push({
        command: "arc",
        x: e,
        y: t,
        radius: s,
        startAngle: i,
        endAngle: a,
        antiClockWise: r,
      }),
      this
    );
  }),
  (Graphics.free.prototype.circle = function (e, t, s) {
    return (
      this.commands.push({ command: "circle", x: e, y: t, radius: s }), this
    );
  }),
  (Graphics.free.prototype.rect = function (e, t, s, i) {
    return (
      this.commands.push({
        command: "circle",
        x: e,
        y: t,
        width: s,
        height: i,
      }),
      this
    );
  }),
  (Graphics.free.prototype.polygon = function (e) {
    return this.commands.push({ command: "polygon", points: e }), this;
  }),
  (Graphics.free.prototype.executeCommand = function (e, t) {
    var s = e.getContext("2d");
    switch (t.command) {
      case "beginPath":
        s.beginPath();
        break;
      case "stroke":
        s.stroke();
        break;
      case "fill":
        s.fill();
        break;
      case "setStrokeStyle":
        s.strokeStyle = this.lineWidth > 0 ? t.style : "transparent";
        break;
      case "setFillStyle":
        s.fillStyle = t.style;
        break;
      case "moveTo":
        s.moveTo(t.x * Utils.globalScale, t.y * Utils.globalScale);
        break;
      case "lineTo":
        s.lineTo(t.x * Utils.globalScale, t.y * Utils.globalScale);
        break;
      case "arc":
        s.arc(
          t.x * Utils.globalScale,
          t.y * Utils.globalScale,
          t.radius * Utils.globalScale,
          t.startAngle,
          t.endAngle,
          t.antiClockWise
        );
        break;
      case "circle":
        s.arc(
          t.x * Utils.globalScale,
          t.y * Utils.globalScale,
          t.radius * Utils.globalScale,
          0,
          2 * Math.PI
        );
        break;
      case "rect":
        s.rect(
          (t.x - t.width / 2) * Utils.globalScale,
          (t.y - t.height / 2) * Utils.globalScale,
          t.width * Utils.globalScale,
          t.height * Utils.globalScale
        );
        break;
      case "polygon":
        s.moveTo(
          t.points[0].x * Utils.globalScale,
          t.points[0].y * Utils.globalScale
        );
        for (var i = 1; i < t.points.length; i++)
          s.lineTo(
            t.points[i].x * Utils.globalScale,
            t.points[i].y * Utils.globalScale
          );
        s.lineTo(
          t.points[0].x * Utils.globalScale,
          t.points[0].y * Utils.globalScale
        );
    }
  }),
  (Graphics.free.prototype.executeCommands = function (e) {
    for (var t = 0; t < this.commands.length; t++)
      this.executeCommand(e, this.commands[t]);
  }),
  (Graphics.free.prototype.render = function (e, t, s) {
    this.prepareCanvas(e),
      !!this["static"] == !!t &&
        0 != this.opacity &&
        (this.preparePath(e), this.executeCommands(e), this.finalizeCanvas(e)),
      Utils.callSuperMethod(Graphics.free, this, "render", e, t, s),
      this.restoreCanvas(e);
  });
var BitmapsCache = {};
(BitmapsCache.bitmaps = {}),
  (BitmapsCache.cache = function (e) {
    if (!(e && e instanceof Image)) return e;
    if (BitmapsCache.bitmaps[e.src]) return BitmapsCache.bitmaps[e.src];
    var t = document.createElement("canvas");
    (t.width = e.width), (t.height = e.height);
    var s = t.getContext("2d");
    return (
      s.drawImage(e, 0, 0, e.width, e.height, 0, 0, e.width, e.height),
      (BitmapsCache.bitmaps[e.src] = t),
      t
    );
  });
var ImageFilter = {};
(ImageFilter.cache = {}),
  (ImageFilter.getFromCache = function (e, t, s) {
    if (!(t instanceof Image)) return null;
    if (!ImageFilter.cache[e]) return null;
    for (var i = ImageFilter.cache[e], a = 0; a < i.length; a++) {
      var r = i[a];
      if (r.src == t.src) {
        for (var o = !0, n = 0; n < s.length; n++)
          if (s[n] != r.args[n]) {
            o = !1;
            break;
          }
        if (o) return r.cns;
      }
    }
    return null;
  }),
  (ImageFilter.putToCache = function (e, t, s, i) {
    if (t instanceof Image && "string" == typeof e) {
      var a = { src: t.src, args: s, cns: i };
      ImageFilter.cache[e] || (ImageFilter.cache[e] = []),
        ImageFilter.cache[e].push(a);
    }
  }),
  (ImageFilter.apply = function (e, t) {
    if (
      !(
        e instanceof Image ||
        e instanceof HTMLImageElement ||
        e instanceof HTMLCanvasElement
      )
    )
      throw new Error("Incorrect bitmap. Must be Image or Canvas.");
    var s = t;
    if (
      ("string" == typeof t && (s = ImageFilter.filter[t]),
      "function" != typeof s)
    )
      throw new Error("Incorrect filter " + t);
    for (var i = [], a = 2; a < arguments.length; a++) i.push(arguments[a]);
    var r = ImageFilter.getFromCache(t, e, i);
    if (r) return r;
    var o = document.createElement("canvas");
    (o.width = e.width), (o.height = e.height);
    var n = o.getContext("2d");
    n.drawImage(e, 0, 0, e.width, e.height, 0, 0, e.width, e.height);
    var h = s.apply(
      ImageFilter.filter[t],
      [n.getImageData(0, 0, o.width, o.height)].concat(i)
    );
    return n.putImageData(h, 0, 0), ImageFilter.putToCache(t, e, i, o), o;
  }),
  (ImageFilter.clearCache = function () {
    ImageFilter.cache = {};
  }),
  (ImageFilter.filter = {}),
  (ImageFilter.filter.grayscale = function (e) {
    for (var t = 0; t < e.data.length; t += 4) {
      var s =
        0.2126 * e.data[t] + 0.7152 * e.data[t + 1] + 0.0722 * e.data[t + 2];
      (e.data[t] = s), (e.data[t + 1] = s), (e.data[t + 2] = s);
    }
    return e;
  }),
  (ImageFilter.filter.discolor = function (e) {
    for (var t = 0; t < e.data.length; t += 4) {
      var s = (e.data[t] + e.data[t + 1] + e.data[t + 2]) / 2;
      (e.data[t] = s), (e.data[t + 1] = s), (e.data[t + 2] = s);
    }
    return e;
  }),
  (ImageFilter.filter.brightness = function (e, t) {
    t *= 255;
    for (var s = 0; s < e.data.length; s += 4)
      (e.data[s] = Math.min(e.data[s] + t, 255)),
        (e.data[s + 1] = Math.min(e.data[s + 1] + t, 255)),
        (e.data[s + 2] = Math.min(e.data[s + 2] + t, 255));
    return e;
  }),
  (ImageFilter.filter.tint = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      e.data[a] + 3 &&
        ((e.data[a] = t), (e.data[a + 1] = s), (e.data[a + 2] = i));
    return e;
  }),
  (ImageFilter.filter.invert = function (e) {
    for (var t = 0; t < e.data.length; t += 4)
      (e.data[t] = 255 - e.data[t]),
        (e.data[t + 1] = 255 - e.data[t + 1]),
        (e.data[t + 2] = 255 - e.data[t + 2]);
    return e;
  }),
  (ImageFilter.filter.multiply = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = (e.data[a] * t) / 255),
        (e.data[a + 1] = (e.data[a + 1] * s) / 255),
        (e.data[a + 2] = (e.data[a + 2] * i) / 255);
    return e;
  }),
  (ImageFilter.filter.sepia = function (e) {
    for (var t = 0; t < e.data.length; t += 4) {
      var s = 0.3 * e.data[t] + 0.59 * e.data[t + 1] + 0.11 * e.data[t + 2];
      (e.data[t] = s + 100),
        (e.data[t + 1] = s + 50),
        (e.data[t + 2] = s + 255);
    }
    return e;
  }),
  (ImageFilter.filter.sepia2 = function (e) {
    for (var t = 0; t < e.data.length; t += 4) {
      var s = e.data[t],
        i = e.data[t + 1],
        a = e.data[t + 2];
      (e.data[t] = (0.393 * s + 0.769 * i + 0.189 * a) / 1.351),
        (e.data[t + 1] = (0.349 * s + 0.686 * i + 0.168 * a) / 1.203),
        (e.data[t + 2] = (0.272 * s + 0.534 * i + 0.131 * a) / 2.14);
    }
    return e;
  }),
  (ImageFilter.filter.add = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = Math.min(e.data[a] + t, 255)),
        (e.data[a + 1] = Math.min(e.data[a + 1] + s, 255)),
        (e.data[a + 2] = Math.min(e.data[a + 2] + i, 255));
    return e;
  }),
  (ImageFilter.filter.screen = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = 1 - (1 - e.data[a]) * (1 - t)),
        (e.data[a + 1] = 1 - (1 - e.data[a + 1]) * (1 - s)),
        (e.data[a + 2] = 1 - (1 - e.data[a + 2]) * (1 - i));
    return e;
  }),
  (ImageFilter.filter.diff = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = Math.abs(e.data[a] - t)),
        (e.data[a + 1] = Math.abs(e.data[a + 1] - s)),
        (e.data[a + 2] = Math.abs(e.data[a + 2] - i));
    return e;
  }),
  (ImageFilter.filter.darken = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = Math.min(e.data[a], t)),
        (e.data[a + 1] = Math.min(e.data[a + 1], s)),
        (e.data[a + 2] = Math.min(e.data[a + 2], i));
    return e;
  }),
  (ImageFilter.filter.lighten = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = Math.max(e.data[a], t)),
        (e.data[a + 1] = Math.max(e.data[a + 1], s)),
        (e.data[a + 2] = Math.max(e.data[a + 2], i));
    return e;
  }),
  (ImageFilter.filter.subtract = function (e, t, s, i) {
    for (var a = 0; a < e.data.length; a += 4)
      (e.data[a] = Math.max(e.data[a] - t, 0)),
        (e.data[a + 1] = Math.max(e.data[a + 1] - s, 0)),
        (e.data[a + 2] = Math.max(e.data[a + 2] - i, 0));
    return e;
  }),
  (ImageFilter.filter.blur = function (e, t, s) {
    return (
      (t = t || 5),
      (e = s
        ? ImageFilter.filter.blur.rgba(e, t)
        : ImageFilter.filter.blur.rgb(e, t))
    );
  }),
  (ImageFilter.filter.blur.mulTable = [
    512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292,
    512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292,
    273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259,
    496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292,
    282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373,
    364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259,
    507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381,
    374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292,
    287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461,
    454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373,
    368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309,
    305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259,
    257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442,
    437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381,
    377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332,
    329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
    289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259,
  ]),
  (ImageFilter.filter.blur.shgTable = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
    17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19,
    19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24,
  ]),
  (ImageFilter.filter.blur.getStack = function () {
    return { r: 0, g: 0, b: 0, a: 0, next: null };
  }),
  (ImageFilter.filter.blur.rgba = function (e, t) {
    var s,
      i,
      a,
      r,
      o,
      n,
      h,
      l,
      p,
      d,
      c,
      u,
      g,
      f,
      m,
      y,
      x,
      v,
      w,
      b,
      S,
      A,
      _,
      C,
      T = e.data,
      U = e.width,
      k = e.height,
      F = t + t + 1,
      M = U - 1,
      I = k - 1,
      P = t + 1,
      L = (P * (P + 1)) / 2,
      E = ImageFilter.filter.blur.getStack(),
      B = E;
    for (a = 1; F > a; a++)
      if (((B = B.next = ImageFilter.filter.blur.getStack()), a == P))
        var O = B;
    B.next = E;
    var D = null,
      G = null;
    h = n = 0;
    var N = ImageFilter.filter.blur.mulTable[t],
      H = ImageFilter.filter.blur.shgTable[t];
    for (i = 0; k > i; i++) {
      for (
        y = x = v = w = l = p = d = c = 0,
          u = P * (b = T[n]),
          g = P * (S = T[n + 1]),
          f = P * (A = T[n + 2]),
          m = P * (_ = T[n + 3]),
          l += L * b,
          p += L * S,
          d += L * A,
          c += L * _,
          B = E,
          a = 0;
        P > a;
        a++
      )
        (B.r = b), (B.g = S), (B.b = A), (B.a = _), (B = B.next);
      for (a = 1; P > a; a++)
        (r = n + ((a > M ? M : a) << 2)),
          (l += (B.r = b = T[r]) * (C = P - a)),
          (p += (B.g = S = T[r + 1]) * C),
          (d += (B.b = A = T[r + 2]) * C),
          (c += (B.a = _ = T[r + 3]) * C),
          (y += b),
          (x += S),
          (v += A),
          (w += _),
          (B = B.next);
      for (D = E, G = O, s = 0; U > s; s++)
        (T[n + 3] = _ = (c * N) >> H),
          0 != _
            ? ((_ = 255 / _),
              (T[n] = ((l * N) >> H) * _),
              (T[n + 1] = ((p * N) >> H) * _),
              (T[n + 2] = ((d * N) >> H) * _))
            : (T[n] = T[n + 1] = T[n + 2] = 0),
          (l -= u),
          (p -= g),
          (d -= f),
          (c -= m),
          (u -= D.r),
          (g -= D.g),
          (f -= D.b),
          (m -= D.a),
          (r = (h + ((r = s + t + 1) < M ? r : M)) << 2),
          (y += D.r = T[r]),
          (x += D.g = T[r + 1]),
          (v += D.b = T[r + 2]),
          (w += D.a = T[r + 3]),
          (l += y),
          (p += x),
          (d += v),
          (c += w),
          (D = D.next),
          (u += b = G.r),
          (g += S = G.g),
          (f += A = G.b),
          (m += _ = G.a),
          (y -= b),
          (x -= S),
          (v -= A),
          (w -= _),
          (G = G.next),
          (n += 4);
      h += U;
    }
    for (s = 0; U > s; s++) {
      for (
        x = v = w = y = p = d = c = l = 0,
          n = s << 2,
          u = P * (b = T[n]),
          g = P * (S = T[n + 1]),
          f = P * (A = T[n + 2]),
          m = P * (_ = T[n + 3]),
          l += L * b,
          p += L * S,
          d += L * A,
          c += L * _,
          B = E,
          a = 0;
        P > a;
        a++
      )
        (B.r = b), (B.g = S), (B.b = A), (B.a = _), (B = B.next);
      for (o = U, a = 1; t >= a; a++)
        (n = (o + s) << 2),
          (l += (B.r = b = T[n]) * (C = P - a)),
          (p += (B.g = S = T[n + 1]) * C),
          (d += (B.b = A = T[n + 2]) * C),
          (c += (B.a = _ = T[n + 3]) * C),
          (y += b),
          (x += S),
          (v += A),
          (w += _),
          (B = B.next),
          I > a && (o += U);
      for (n = s, D = E, G = O, i = 0; k > i; i++)
        (r = n << 2),
          (T[r + 3] = _ = (c * N) >> H),
          _ > 0
            ? ((_ = 255 / _),
              (T[r] = ((l * N) >> H) * _),
              (T[r + 1] = ((p * N) >> H) * _),
              (T[r + 2] = ((d * N) >> H) * _))
            : (T[r] = T[r + 1] = T[r + 2] = 0),
          (l -= u),
          (p -= g),
          (d -= f),
          (c -= m),
          (u -= D.r),
          (g -= D.g),
          (f -= D.b),
          (m -= D.a),
          (r = (s + ((r = i + P) < I ? r : I) * U) << 2),
          (l += y += D.r = T[r]),
          (p += x += D.g = T[r + 1]),
          (d += v += D.b = T[r + 2]),
          (c += w += D.a = T[r + 3]),
          (D = D.next),
          (u += b = G.r),
          (g += S = G.g),
          (f += A = G.b),
          (m += _ = G.a),
          (y -= b),
          (x -= S),
          (v -= A),
          (w -= _),
          (G = G.next),
          (n += U);
    }
    return e;
  }),
  (ImageFilter.filter.blur.rgb = function (e, t) {
    var s,
      i,
      a,
      r,
      o,
      n,
      h,
      l,
      p,
      d,
      c,
      u,
      g,
      f,
      m,
      y,
      x,
      v,
      w,
      b,
      S = e.data,
      A = e.width,
      _ = e.height,
      C = t + t + 1,
      T = A - 1,
      U = _ - 1,
      k = t + 1,
      F = (k * (k + 1)) / 2,
      M = ImageFilter.filter.blur.getStack(),
      I = M;
    for (a = 1; C > a; a++)
      if (((I = I.next = ImageFilter.filter.blur.getStack()), a == k))
        var P = I;
    I.next = M;
    var L = null,
      E = null;
    h = n = 0;
    var B = ImageFilter.filter.blur.mulTable[t],
      O = ImageFilter.filter.blur.shgTable[t];
    for (i = 0; _ > i; i++) {
      for (
        f = m = y = l = p = d = 0,
          c = k * (x = S[n]),
          u = k * (v = S[n + 1]),
          g = k * (w = S[n + 2]),
          l += F * x,
          p += F * v,
          d += F * w,
          I = M,
          a = 0;
        k > a;
        a++
      )
        (I.r = x), (I.g = v), (I.b = w), (I = I.next);
      for (a = 1; k > a; a++)
        (r = n + ((a > T ? T : a) << 2)),
          (l += (I.r = x = S[r]) * (b = k - a)),
          (p += (I.g = v = S[r + 1]) * b),
          (d += (I.b = w = S[r + 2]) * b),
          (f += x),
          (m += v),
          (y += w),
          (I = I.next);
      for (L = M, E = P, s = 0; A > s; s++)
        (S[n] = (l * B) >> O),
          (S[n + 1] = (p * B) >> O),
          (S[n + 2] = (d * B) >> O),
          (l -= c),
          (p -= u),
          (d -= g),
          (c -= L.r),
          (u -= L.g),
          (g -= L.b),
          (r = (h + ((r = s + t + 1) < T ? r : T)) << 2),
          (f += L.r = S[r]),
          (m += L.g = S[r + 1]),
          (y += L.b = S[r + 2]),
          (l += f),
          (p += m),
          (d += y),
          (L = L.next),
          (c += x = E.r),
          (u += v = E.g),
          (g += w = E.b),
          (f -= x),
          (m -= v),
          (y -= w),
          (E = E.next),
          (n += 4);
      h += A;
    }
    for (s = 0; A > s; s++) {
      for (
        m = y = f = p = d = l = 0,
          n = s << 2,
          c = k * (x = S[n]),
          u = k * (v = S[n + 1]),
          g = k * (w = S[n + 2]),
          l += F * x,
          p += F * v,
          d += F * w,
          I = M,
          a = 0;
        k > a;
        a++
      )
        (I.r = x), (I.g = v), (I.b = w), (I = I.next);
      for (o = A, a = 1; t >= a; a++)
        (n = (o + s) << 2),
          (l += (I.r = x = S[n]) * (b = k - a)),
          (p += (I.g = v = S[n + 1]) * b),
          (d += (I.b = w = S[n + 2]) * b),
          (f += x),
          (m += v),
          (y += w),
          (I = I.next),
          U > a && (o += A);
      for (n = s, L = M, E = P, i = 0; _ > i; i++)
        (r = n << 2),
          (S[r] = (l * B) >> O),
          (S[r + 1] = (p * B) >> O),
          (S[r + 2] = (d * B) >> O),
          (l -= c),
          (p -= u),
          (d -= g),
          (c -= L.r),
          (u -= L.g),
          (g -= L.b),
          (r = (s + ((r = i + k) < U ? r : U) * A) << 2),
          (l += f += L.r = S[r]),
          (p += m += L.g = S[r + 1]),
          (d += y += L.b = S[r + 2]),
          (L = L.next),
          (c += x = E.r),
          (u += v = E.g),
          (g += w = E.b),
          (f -= x),
          (m -= v),
          (y -= w),
          (E = E.next),
          (n += A);
    }
    return e;
  }),
  Utils.extend(Sprite, DisplayObject),
  (Sprite.prototype.animated = !0),
  (Sprite.prototype.animDirection = 1),
  (Sprite.prototype.currentFrame = 0),
  (Sprite.prototype.totalFrames = 1),
  (Sprite.prototype.currentLayer = 0),
  (Sprite.prototype.totalLayers = 1),
  (Sprite.prototype.bitmap = null),
  (Sprite.prototype.mask = null),
  (Sprite.prototype.isMask = !1),
  (Sprite.prototype.maskInvert = !1),
  (Sprite.prototype.animStep = 0),
  (Sprite.prototype.animDelay = 1),
  (Sprite.prototype.changeFrameDelay = 1e3 / 24),
  (Sprite.prototype.changeFrameTime = 0),
  (Sprite.prototype.onchangeframe = null),
  (Sprite.prototype.onanimend = null),
  (Sprite.prototype.cacheBitmap = !1),
  (Sprite.prototype.transformFilter = null),
  (Sprite.create = function (e, t) {
    if ("string" == typeof e) {
      if (((t = t || window.library), !t))
        throw new Error(
          "Could not create sprite from asset '%s'. Library not found.",
          e
        );
      e = t.getAsset(e);
    }
    return new Sprite(
      e.bitmap,
      e.width || 1,
      e.height || 1,
      e.frames || 1,
      e.layers || 1
    );
  }),
  (Sprite.prototype.play = function (e) {
    (this.animated = !0),
      "undefined" != typeof e && (this.animDirection = e ? -1 : 1);
  }),
  (Sprite.prototype.stop = function () {
    this.animated = !1;
  }),
  (Sprite.prototype.gotoAndStop = function (e) {
    (this.currentFrame = e), this.stop();
  }),
  (Sprite.prototype.gotoAndPlay = function (e, t) {
    (this.currentFrame = e), this.play(t);
  }),
  (Sprite.prototype.nextFrame = function (e) {
    this.hasEventListener("enterframe") &&
      this.dispatchEvent("enterframe", { target: this, delta: e });
    var t = 1;
    if (Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME) {
      if (
        ((this.changeFrameTime += e),
        !(this.changeFrameTime >= this.changeFrameDelay * this.animDelay))
      )
        return;
      (t = Math.floor(
        this.changeFrameTime / (this.changeFrameDelay * this.animDelay)
      )),
        (this.changeFrameTime -=
          Math.abs(t) * this.changeFrameDelay * this.animDelay);
    } else this.animStep++;
    if (
      this.animStep >= this.animDelay ||
      Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME
    ) {
      for (var s = 0; t > s; s++)
        this.animated && (this.currentFrame += this.animDirection),
          this.animDirection > 0 &&
            this.currentFrame >= this.totalFrames &&
            ((this.currentFrame = 0),
            this.hasEventListener("animend") &&
              this.dispatchEvent("animend", { target: this, delta: e })),
          this.animDirection < 0 &&
            this.currentFrame < 0 &&
            ((this.currentFrame = this.totalFrames - 1),
            this.hasEventListener("animend") &&
              this.dispatchEvent("animend", { target: this, delta: e })),
          this.hasEventListener("changeframe") &&
            this.dispatchEvent("changeframe", { target: this, delta: e });
      this.animStep = 0;
    }
  }),
  (Sprite.prototype.setMask = function (e) {
    (this.mask = e), (this.mask.isMask = !0), (this.mask.stage = this.stage);
  }),
  (Sprite.prototype.renderBack = function (e, t, s, i) {
    if (t) {
      var a = 0,
        r = 0;
      this.fillPattern &&
        this.fillPattern.offset &&
        ((a = this.fillPattern.offset.x * Utils.globalScale),
        (r = this.fillPattern.offset.y * Utils.globalScale));
      var o = e.getContext("2d");
      o.save(),
        o.translate(-(s / 2) + a, -(i / 2) + r),
        (o.fillStyle = t),
        (o.strokeStyle = t),
        o.fillRect(-a, -r, s, i),
        o.restore();
    }
  }),
  (Sprite.prototype.renderBitmap = function (e, t, s, i) {
    if (this.bitmap) {
      var a = this.bitmap.width,
        r = this.bitmap.height,
        o = this.currentLayer * t + this.offset.left * Utils.globalScale,
        n = this.currentFrame * s + this.offset.top * Utils.globalScale;
      if ((0 > o && (o = 0), 0 > n && (n = 0), a > o && r > n)) {
        var h = t,
          l = s;
        if (
          (o + h > a && (h = a - o),
          n + l > r && (l = r - n),
          Sprite.FLOOR_VALUES_ON_RENDER &&
            ((o = ~~o), (n = ~~n), (h = ~~h), (l = ~~l), (t = ~~t), (s = ~~s)),
          h > 0 &&
            l > 0 &&
            t > 0 &&
            s > 0 &&
            (this.transformFilter
              ? this.transformFilter.filter(
                  e,
                  this.cacheBitmap
                    ? BitmapsCache.cache(this.bitmap)
                    : this.bitmap,
                  o,
                  n,
                  h,
                  l,
                  -t / 2,
                  -s / 2,
                  t,
                  s
                )
              : e
                  .getContext("2d")
                  .drawImage(
                    this.cacheBitmap
                      ? BitmapsCache.cache(this.bitmap)
                      : this.bitmap,
                    o,
                    n,
                    h,
                    l,
                    -t / 2,
                    -s / 2,
                    t,
                    s
                  )),
          i)
        )
          return { x: o, y: n, width: h, height: l };
      }
    }
    return i ? { x: 0, y: 0, width: t, height: s } : void 0;
  }),
  (Sprite.prototype.render = function (e, t, s, i) {
    if (!this.isMask || i) {
      s || (s = 0);
      var a = !!this["static"] == !!t;
      if ((a && this.nextFrame(s), this.stage && !this.destroy)) {
        if (
          (this.prepareCanvas(e),
          a &&
            this.visible &&
            0 != this.opacity &&
            (!this.hasEventListener("prerender") ||
              this.dispatchEvent("prerender", {
                target: this,
                canvas: e,
                delta: s,
              }) !== !1))
        ) {
          this.moveCanvasAnchor(e);
          var r = this.width * Utils.globalScale,
            o = this.height * Utils.globalScale,
            n = this.getFillStyle(e);
          if (
            (this.prepareCanvasShadow(e),
            this.stage.ceilSizes && ((r = Math.ceil(r)), (o = Math.ceil(o))),
            this.mask)
          ) {
            this.stage.buffer.width = this.stage.buffer.width;
            var h = this.stage.buffer.getContext("2d");
            h.save(),
              h.translate(r / 2, o / 2),
              this.renderBack(this.stage.buffer, n, r, o);
            var l = this.renderBitmap(this.stage.buffer, r, o, !0);
            (h.globalCompositeOperation = this.maskInvert
              ? "destination-out"
              : "destination-in"),
              this.mask.render
                ? this.mask.render(this.stage.buffer, t, s, !0)
                : h.drawImage(
                    this.mask,
                    this.mask.x ? this.mask.x : 0,
                    this.mask.y ? this.mask.y : 0
                  ),
              Sprite.FLOOR_VALUES_ON_RENDER
                ? e
                    .getContext("2d")
                    .drawImage(
                      this.stage.buffer,
                      0,
                      0,
                      l.width,
                      l.height,
                      -Math.floor(r / 2),
                      -Math.floor(o / 2),
                      ~~r,
                      ~~o
                    )
                : e
                    .getContext("2d")
                    .drawImage(
                      this.stage.buffer,
                      0,
                      0,
                      l.width,
                      l.height,
                      -r / 2,
                      -o / 2,
                      r,
                      o
                    ),
              h.restore();
          } else this.renderBack(e, n, r, o), this.renderBitmap(e, r, o);
          this.stage.allowDebugDrawing &&
            this.allowDebugDrawing &&
            ((!this.stage.allowStaticDebugDrawing && this["static"]) ||
              this.debugDraw()),
            this.hasEventListener("render") &&
              this.dispatchEvent("render", {
                target: this,
                canvas: e,
                delta: s,
              }),
            this.restoreCanvasShadow(e),
            this.moveCanvasAnchor(e, !0);
        }
        Utils.callSuperMethod(Sprite, this, "render", e, t, s),
          this.restoreCanvas(e);
      }
    }
  }),
  (Sprite.prototype.resetView = function () {
    (this.bitmap = null),
      (this.fillColor = null),
      (this.fillLinearGradient = null),
      (this.fillRadialGradient = null),
      (this.fillPattern = null);
    for (var e = 0; e < this.objects.length; e++)
      this.objects[e].resetView && this.objects[e].resetView();
  }),
  (Sprite.prototype.setTransformFilter = function (e) {
    (e.sprite = this), (this.transformFilter = e);
  }),
  (Sprite.prototype.removeTransformFilter = function () {
    this.transformFilter = null;
  }),
  (Sprite.CHANGE_FRAME_BY_FRAME = 0),
  (Sprite.CHANGE_FRAME_BY_TIME = 1),
  (Sprite.CHANGE_FRAME_DELAY = 1e3 / 24),
  (Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_FRAME),
  (Sprite.FLOOR_VALUES_ON_RENDER = !0),
  (Sprite.CACHE_BITMAPS = !1),
  (TransformFilter.prototype.animateTo = function (e, t, s, i, a) {
    if (this.sprite && this.sprite.stage) {
      t = ~~t;
      var r = null;
      return (
        0 >= t
          ? (this.val = e)
          : this.val != e &&
            ((r = this.sprite.stage.createTween(
              this,
              "val",
              this.val,
              e,
              t,
              s
            )),
            r && ((r.onfinish = i), (r.onchange = a), r.play())),
        !r && i && i({ target: new Tween(this, "val", e, e, t, s) }),
        this
      );
    }
  }),
  (TransformFilter.prototype.animateBy = function (e, t, s, i, a) {
    if (this.sprite && this.sprite.stage) {
      t = ~~t;
      var r = null;
      return (
        0 >= t
          ? (this.val += e)
          : 0 != e &&
            ((r = this.sprite.stage.createTween(
              this,
              "val",
              this.val,
              this.val + e,
              t,
              s
            )),
            r && ((r.onfinish = i), (r.onchange = a), r.play())),
        !r &&
          i &&
          i({ target: new Tween(this, "val", this.val, this.val, t, s) }),
        this
      );
    }
  }),
  (TransformFilter.noizeX = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.noizeX, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.noizeX, TransformFilter),
  (TransformFilter.noizeX.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = 0, d = l / r, c = 0; r > c; c += this.step) {
      var u = this.val * (p % 2 == 0 ? 1 : -1) * Utils.globalScale,
        g = Math.min(this.step, r - (i + c));
      e
        .getContext("2d")
        .drawImage(t, s, i + c, a, g, o + u, n + c * d, h, g * d),
        p++;
    }
  }),
  (TransformFilter.noizeY = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.noizeY, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.noizeY, TransformFilter),
  (TransformFilter.noizeY.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = 0, d = h / a, c = 0; a > c; c += this.step) {
      var u = this.val * (p % 2 == 0 ? 1 : -1) * Utils.globalScale,
        g = Math.min(this.step, a - (s + c));
      e
        .getContext("2d")
        .drawImage(t, s + c, i, g, r, o + c * d, n + u, g * d, l),
        p++;
    }
  }),
  (TransformFilter.waveX = function (e, t, s) {
    Utils.callSuperConstructor(TransformFilter.waveX, this, this.apply),
      (this.val = e || 1),
      (this.strength = t || 1),
      (this.step = s || 1);
  }),
  Utils.extend(TransformFilter.waveX, TransformFilter),
  (TransformFilter.waveX.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = 0, d = l / r, c = 0; r > c; c += this.step) {
      var u = Math.sin(this.val + c / this.strength) * Utils.globalScale,
        g = Math.min(this.step, r - (i + c));
      e
        .getContext("2d")
        .drawImage(t, s, i + c, a, g, o + u, n + c * d, h, g * d),
        p++;
    }
  }),
  (TransformFilter.waveY = function (e, t, s) {
    Utils.callSuperConstructor(TransformFilter.waveY, this, this.apply),
      (this.val = e || 1),
      (this.strength = t || 1),
      (this.step = s || 1);
  }),
  Utils.extend(TransformFilter.waveY, TransformFilter),
  (TransformFilter.waveY.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = 0, d = h / a, c = 0; a > c; c += this.step) {
      var u = Math.sin(this.val + c / this.strength) * Utils.globalScale,
        g = Math.min(this.step, a - (s + c));
      e
        .getContext("2d")
        .drawImage(t, s + c, i, g, r, o + c * d, n + u, g * d, l),
        p++;
    }
  }),
  (TransformFilter.scaleTop = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.scaleTop, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.scaleTop, TransformFilter),
  (TransformFilter.scaleTop.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = l / r, d = (1 - this.val) / r, c = 0; r > c; c += this.step) {
      var u = Math.min(this.step, r - (i + c)),
        g = h * (this.val + d * (c + u));
      e.getContext("2d").drawImage(
        t,
        s,
        i + c,
        a,
        u,
        o + (h - g) / 2,
        n + c * p,
        g,
        u * p
      );
    }
  }),
  (TransformFilter.scaleBottom = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.scaleBottom, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.scaleBottom, TransformFilter),
  (TransformFilter.scaleBottom.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = l / r, d = (this.val - 1) / r, c = 0; r > c; c += this.step) {
      var u = Math.min(this.step, r - (i + c)),
        g = h * (1 + d * (c + u));
      e.getContext("2d").drawImage(
        t,
        s,
        i + c,
        a,
        u,
        o + (h - g) / 2,
        n + c * p,
        g,
        u * p
      );
    }
  }),
  (TransformFilter.scaleLeft = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.scaleLeft, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.scaleLeft, TransformFilter),
  (TransformFilter.scaleLeft.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = h / a, d = (1 - this.val) / a, c = 0; a > c; c += this.step) {
      var u = Math.min(this.step, a - (s + c)),
        g = l * (this.val + d * (c + u));
      e.getContext("2d").drawImage(
        t,
        s + c,
        i,
        u,
        r,
        o + c * p,
        n + (l - g) / 2,
        u * p,
        g
      );
    }
  }),
  (TransformFilter.scaleRight = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.scaleRight, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.scaleRight, TransformFilter),
  (TransformFilter.scaleRight.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (var p = h / a, d = (this.val - 1) / a, c = 0; a > c; c += this.step) {
      var u = Math.min(this.step, a - (s + c)),
        g = l * (1 + d * (c + u));
      e.getContext("2d").drawImage(
        t,
        s + c,
        i,
        u,
        r,
        o + c * p,
        n + (l - g) / 2,
        u * p,
        g
      );
    }
  }),
  (TransformFilter.trail = function (e, t, s, i, a, r, o) {
    Utils.callSuperConstructor(TransformFilter.trail, this, this.apply),
      (this.val = e || 0),
      (this.count = t || 3),
      (this.distance = s || 20),
      (this.startOpacity = "undefined" == typeof i ? 0.5 : i),
      (this.endOpacity = "undefined" == typeof a ? 0.1 : a),
      (this.startScale = "undefined" == typeof r ? 1 : r),
      (this.endScale = "undefined" == typeof o ? 1 : o);
  }),
  Utils.extend(TransformFilter.trail, TransformFilter),
  (TransformFilter.trail.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    var p = e.getContext("2d");
    p.save();
    var d = (this.distance / this.count) * Utils.globalScale,
      c = p.globalAlpha,
      u = this.startOpacity * c,
      g = this.endOpacity * c,
      f = (u - g) / this.count,
      m = 1 + (this.startScale - this.endScale) / this.count;
    p.scale(this.endScale, this.endScale);
    for (var y = this.count; y > 0; y--) {
      var x = o + h / 2 + Math.cos(this.val) * (y * d),
        v = n + l / 2 + Math.sin(this.val) * (y * d);
      this.startScale + m * y;
      (p.globalAlpha = g + (u - y * f)),
        p.scale(m, m),
        p.drawImage(t, s, i, a, r, x - h / 2, v - l / 2, h, l);
    }
    p.restore(), p.drawImage(t, s, i, a, r, o, n, h, l);
  }),
  (TransformFilter.composite = function (e) {
    Utils.callSuperConstructor(TransformFilter.composite, this, this.apply),
      (this.val = e || "source-over");
  }),
  Utils.extend(TransformFilter.composite, TransformFilter),
  (TransformFilter.composite.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    var p = e.getContext("2d"),
      d = p.globalCompositeOperation;
    (p.globalCompositeOperation = this.val),
      p.drawImage(t, s, i, a, r, o, n, h, l),
      (p.globalCompositeOperation = d);
  }),
  (TransformFilter.lens = function (e, t, s, i, a) {
    Utils.callSuperConstructor(TransformFilter.lens, this, this.apply),
      (this.val = e || 2),
      (this.x = t || 0),
      (this.y = s || 0),
      (this.radius = i || 30),
      (this.opacity = a || 1);
  }),
  Utils.extend(TransformFilter.lens, TransformFilter),
  (TransformFilter.lens.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    var p = e.getContext("2d");
    p.drawImage(t, s, i, a, r, o, n, h, l),
      p.save(),
      p.beginPath(),
      p.arc(
        this.x * Utils.globalScale,
        this.y * Utils.globalScale,
        this.radius * Utils.globalScale,
        0,
        2 * Math.PI
      ),
      p.closePath(),
      p.clip(),
      (p.globalAlpha = this.opacity),
      p.drawImage(
        t,
        s,
        i,
        a,
        r,
        o -
          (this.x * this.val - this.x) * Utils.globalScale -
          (h * this.val - h) / 2,
        n -
          (this.y * this.val - this.y) * Utils.globalScale -
          (l * this.val - l) / 2,
        h * this.val,
        l * this.val
      ),
      p.restore();
  }),
  (TransformFilter.moveTop = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.moveTop, this, this.apply),
      (this.val = e || 10),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.moveTop, TransformFilter),
  (TransformFilter.moveTop.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (
      var p = l / r,
        d = (this.val * Utils.globalScale) / (r / this.step),
        c = 0;
      r > c;
      c += this.step
    ) {
      var u = Math.min(this.step, r - (i + c)),
        g = (r - c) * d;
      e.getContext("2d").drawImage(
        t,
        s,
        i + c,
        a,
        u,
        o + g,
        n + c * p,
        h,
        u * p
      );
    }
  }),
  (TransformFilter.moveBottom = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.moveBottom, this, this.apply),
      (this.val = e || 10),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.moveBottom, TransformFilter),
  (TransformFilter.moveBottom.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (
      var p = l / r,
        d = (this.val * Utils.globalScale) / (r / this.step),
        c = 0;
      r > c;
      c += this.step
    ) {
      var u = Math.min(this.step, r - (i + c)),
        g = c * d;
      e.getContext("2d").drawImage(
        t,
        s,
        i + c,
        a,
        u,
        o + g,
        n + c * p,
        h,
        u * p
      );
    }
  }),
  (TransformFilter.moveLeft = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.moveLeft, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.moveLeft, TransformFilter),
  (TransformFilter.moveLeft.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (
      var p = h / a,
        d = (this.val * Utils.globalScale) / (a / this.step),
        c = 0;
      a > c;
      c += this.step
    ) {
      var u = Math.min(this.step, a - (s + c)),
        g = (a - c) * d;
      e.getContext("2d").drawImage(
        t,
        s + c,
        i,
        u,
        r,
        o + c * p,
        n + g,
        u * p,
        l
      );
    }
  }),
  (TransformFilter.moveRight = function (e, t) {
    Utils.callSuperConstructor(TransformFilter.moveRight, this, this.apply),
      (this.val = e || 1),
      (this.step = t || 1);
  }),
  Utils.extend(TransformFilter.moveRight, TransformFilter),
  (TransformFilter.moveRight.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    for (
      var p = h / a,
        d = (this.val * Utils.globalScale) / (a / this.step),
        c = 0;
      a > c;
      c += this.step
    ) {
      var u = Math.min(this.step, a - (s + c)),
        g = c * d;
      e.getContext("2d").drawImage(
        t,
        s + c,
        i,
        u,
        r,
        o + c * p,
        n + g,
        u * p,
        l
      );
    }
  }),
  (TransformFilter.dissolutionY = function (e, t, s) {
    Utils.callSuperConstructor(TransformFilter.dissolutionY, this, this.apply),
      (this.val = "undefined" == typeof e ? 1 : e),
      (this.step = "undefined" == typeof t ? 2 : t),
      (this.revert = s || !1);
  }),
  Utils.extend(TransformFilter.dissolutionY, TransformFilter),
  (TransformFilter.dissolutionY.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    if (!(this.val >= this.step)) {
      if (this.val <= 0)
        return void e.getContext("2d").drawImage(t, s, i, a, r, o, n, h, l);
      for (var p = h / a, d = -1, c = 0; r > c; c++)
        d++,
          d > this.step * Utils.globalScale && (d = 0),
          this.revert == d > (this.step - this.val) * Utils.globalScale &&
            e
              .getContext("2d")
              .drawImage(t, s, i + c, a, 1, o, n + c * p, h, 1 * p);
    }
  }),
  (TransformFilter.dissolutionX = function (e, t, s) {
    Utils.callSuperConstructor(TransformFilter.dissolutionX, this, this.apply),
      (this.val = "undefined" == typeof e ? 1 : e),
      (this.step = "undefined" == typeof t ? 2 : t),
      (this.revert = s || !1);
  }),
  Utils.extend(TransformFilter.dissolutionX, TransformFilter),
  (TransformFilter.dissolutionX.prototype.apply = function (
    e,
    t,
    s,
    i,
    a,
    r,
    o,
    n,
    h,
    l
  ) {
    if (!(this.val >= this.step)) {
      if (this.val <= 0)
        return void e.getContext("2d").drawImage(t, s, i, a, r, o, n, h, l);
      for (var p = l / r, d = -1, c = 0; a > c; c++)
        d++,
          d > this.step * Utils.globalScale && (d = 0),
          this.revert == d > (this.step - this.val) * Utils.globalScale &&
            e
              .getContext("2d")
              .drawImage(t, s + c, i, 1, r, o + c * p, n, 1 * p, l);
    }
  }),
  (TransformFilter.filters = [
    "noizeX",
    "noizeY",
    "waveX",
    "waveY",
    "scaleTop",
    "scaleBottom",
    "scaleLeft",
    "scaleRight",
    "trail",
    "composite",
    "lens",
    "moveTop",
    "moveBottom",
    "moveLeft",
    "moveRight",
    "dissolutionX",
    "dissolutionY",
  ]),
  Utils.extend(StageTimer, EventsProxy),
  (StageTimer.prototype.onend = null),
  (StageTimer.prototype.ontick = null),
  (StageTimer.prototype.update = function (delta) {
    if (this.destroy) return !0;
    if (this.paused) return !1;
    if (
      (StageTimer.TIMEOUT_TYPE == StageTimer.TIMEOUT_BY_FRAME
        ? this.timeout--
        : (this.timeout -= delta),
      this.timeout <= 0)
    ) {
      if (
        ("string" == typeof this.onend
          ? eval(this.onend)
          : this.hasEventListener("end") &&
            this.dispatchEvent("end", { target: this }),
        !this.repeat)
      )
        return !0;
      this.rewind();
    }
    return (
      this.hasEventListener("tick") &&
        this.dispatchEvent("tick", { target: this, delta: delta }),
      !1
    );
  }),
  (StageTimer.prototype.rewind = function () {
    this.timeout = this.initialTimeout;
  }),
  (StageTimer.prototype.resume = function () {
    this.paused = !1;
  }),
  (StageTimer.prototype.pause = function () {
    this.paused = !0;
  }),
  (StageTimer.TIMEOUT_BY_FRAME = 0),
  (StageTimer.TIMEOUT_BY_TIME = 1),
  (StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_FRAME),
  Utils.extend(Stage, DisplayObjectContainer),
  (Stage.prototype.refreshBackground = function () {
    this.needToRebuildBack = !0;
  }),
  (Stage.prototype.setBackgroundCanvas = function (e) {
    e &&
      (this.backgroundCanvas =
        "string" == typeof e ? document.getElementById(e) : e);
  }),
  (Stage.prototype.destroy = function () {
    clearTimeout(this.tmMain),
      clearTimeout(this.tmFPS),
      this.stop(),
      this.clear(),
      this.clearScreen(this.canvas),
      this.backgroundCanvas && this.clearScreen(this.backgroundCanvas),
      this.removeInputListeners(this.stage);
  }),
  (Stage.prototype.clearScreen = function (e) {
    this.clearLock ||
      e
        .getContext("2d")
        .clearRect(0, 0, Math.floor(e.width), Math.floor(e.height));
  }),
  (Stage.prototype.addChild = function (e) {
    return (e.stage = this), Utils.callSuperMethod(Stage, this, "addChild", e);
  }),
  (Stage.prototype.setZIndex = function (e, t) {
    this.setChildZIndex(e, t);
  }),
  (Stage.prototype.finalizeMouseCoords = function (e, t) {
    if (!e) return t;
    var s = this.prepareMouseCoord(t.x),
      i = this.prepareMouseCoord(t.y);
    e.getIgnoreViewport() || ((s += this.viewport.x), (i += this.viewport.y));
    var a = e.getAbsolutePosition();
    return (s -= a.x), (i -= a.y), { x: s, y: i };
  }),
  (Stage.prototype.prepareMouseCoord = function (e) {
    return e / Utils.globalScale / Utils.globalPixelScale;
  }),
  (Stage.prototype.processMouseEvent = function (e, t, s) {
    for (
      var i,
        a,
        r = Utils.getMouseCoord(e, this.inputController),
        o = this.getObjectsStackByCoord(
          this.prepareMouseCoord(r.x),
          this.prepareMouseCoord(r.y),
          s,
          !1
        ),
        n = 0;
      n < o.length;
      n++
    )
      if (
        ((a = this.finalizeMouseCoords(o[n], r)),
        o[n].hasEventListener(t) &&
          (i = o[n].dispatchEvent(t, { target: o[n], x: a.x, y: a.y })),
        i === !1)
      )
        return;
    this.hasEventListener(t) &&
      this.dispatchEvent(t, {
        target: this,
        x: Math.floor(this.prepareMouseCoord(r.x)),
        y: Math.floor(this.prepareMouseCoord(r.y)),
      });
  }),
  (Stage.prototype.checkClick = function (e) {
    this.processMouseEvent(e, "click", this.pixelClickEvent);
  }),
  (Stage.prototype.checkContextMenu = function (e) {
    this.processMouseEvent(e, "contextmenu", this.pixelClickEvent);
  }),
  (Stage.prototype.checkMouseMove = function (e) {
    var t = Utils.getMouseCoord(e, this.inputController);
    this.doDrag(this.prepareMouseCoord(t.x), this.prepareMouseCoord(t.y));
    var s,
      i,
      a,
      r = this.getObjectsStackByCoord(
        this.prepareMouseCoord(t.x),
        this.prepareMouseCoord(t.y),
        this.pixelMouseMoveEvent
      ),
      o = [];
    if (r.length > 0) {
      for (
        s = 0;
        s < r.length &&
        (o.push(r[s]),
        (a = this.finalizeMouseCoords(r[s], t)),
        r[s].hasEventListener("mousemove") &&
          (i = r[s].dispatchEvent("mousemove", {
            target: r[s],
            x: a.x,
            y: a.y,
          })),
        i !== !1);
        s++
      );
      for (
        i !== !1 &&
          this.hasEventListener("mousemove") &&
          this.dispatchEvent("mousemove", {
            target: this,
            x: Math.floor(this.prepareMouseCoord(t.x)),
            y: Math.floor(this.prepareMouseCoord(t.y)),
          }),
          i = !0,
          s = 0;
        s < o.length;
        s++
      )
        if (
          ((a = this.finalizeMouseCoords(o[s], t)),
          !o[s].mouseOn &&
            o[s].hasEventListener("mouseover") &&
            (i = o[s].dispatchEvent("mouseover", {
              target: o[s],
              x: a.x,
              y: a.y,
            })),
          (o[s].mouseOn = !0),
          i === !1)
        ) {
          o = o.slice(0, s + 1);
          break;
        }
    } else
      this.hasEventListener("mousemove") &&
        this.dispatchEvent("mousemove", {
          target: this,
          x: Math.floor(this.prepareMouseCoord(t.x)),
          y: Math.floor(this.prepareMouseCoord(t.y)),
        });
    this.checkMouseOut(o, t);
  }),
  (Stage.prototype.checkMouseDown = function (e) {
    this.processMouseEvent(e, "mousedown", this.pixelMouseDownEvent);
  }),
  (Stage.prototype.checkMouseUp = function (e) {
    this.processMouseEvent(e, "mouseup", this.pixelMouseUpEvent);
  }),
  (Stage.prototype.clear = function () {
    (this.tweens = []),
      (this.timers = []),
      (this.eventsListeners = []),
      (this.objectsCounter = 0),
      Utils.callSuperMethod(Stage, this, "clear");
  }),
  (Stage.prototype.getCenter = function () {
    return { x: this.screenWidth / 2, y: this.screenHeight / 2 };
  }),
  (Stage.prototype.prepareCanvasToGraph = function (e) {
    var t = e.getContext("2d");
    t.save(), t.setTransform(1, 0, 0, 1, 0, 0), (t.globalAlpha = 1);
  }),
  (Stage.prototype.drawRectangle = function (e, t, s, i, a, r, o, n) {
    var h = this.canvas;
    this.prepareCanvasToGraph(h);
    var l = h.getContext("2d");
    "undefined" != typeof o ? (l.globalAlpha = o) : (l.globalAlpha = 1),
      a || (a = "#000"),
      (l.fillStyle = a),
      (l.strokeStyle = a),
      n || ((e -= this.viewport.x), (t -= this.viewport.y)),
      (e *= Utils.globalScale),
      (t *= Utils.globalScale),
      (s *= Utils.globalScale),
      (i *= Utils.globalScale),
      r
        ? l.fillRect(e - s / 2, t - i / 2, s, i)
        : l.strokeRect(e - s / 2, t - i / 2, s, i),
      l.restore();
  }),
  (Stage.prototype.drawCircle = function (e, t, s, i, a, r, o) {
    this.drawArc(e, t, s, 0, 2 * Math.PI, !1, i, a, r, o);
  }),
  (Stage.prototype.drawArc = function (e, t, s, i, a, r, o, n, h, l) {
    var p = this.canvas;
    this.prepareCanvasToGraph(p);
    var d = p.getContext("2d");
    "undefined" == typeof n && (n = "#000"),
      (d.strokeStyle = n),
      "undefined" == typeof o && (o = 1),
      (d.lineWidth = o * Utils.globalScale),
      "undefined" == typeof h && (h = 1),
      (d.globalAlpha = h),
      l || ((e -= this.viewport.x), (t -= this.viewport.y)),
      (e *= Utils.globalScale),
      (t *= Utils.globalScale),
      (s *= Utils.globalScale),
      d.beginPath(),
      d.arc(e, t, s, i, a, r),
      d.stroke(),
      d.restore();
  }),
  (Stage.prototype.drawPolygon = function (e, t, s, i, a) {
    if ("object" == typeof e && e instanceof Array && !(e.length < 2)) {
      for (var r = 0; r < e.length - 1; r++)
        this.drawLine(e[r].x, e[r].y, e[r + 1].x, e[r + 1].y, t, s, i, a);
      this.drawLine(e[r].x, e[r].y, e[0].x, e[0].y, t, s, i, a);
    }
  }),
  (Stage.prototype.drawLine = function (e, t, s, i, a, r, o, n) {
    var h = this.canvas;
    this.prepareCanvasToGraph(h);
    var l = h.getContext("2d");
    r ? (l.strokeStyle = r) : (l.strokeStyle = "#000"),
      a
        ? (l.lineWidth = a * Utils.globalScale)
        : (l.lineWidth = Utils.globalScale),
      o ? (l.globalAlpha = o) : (l.globalAlpha = 1),
      n ||
        ((e -= this.viewport.x),
        (t -= this.viewport.y),
        (s -= this.viewport.x),
        (i -= this.viewport.y)),
      (e *= Utils.globalScale),
      (t *= Utils.globalScale),
      (s *= Utils.globalScale),
      (i *= Utils.globalScale),
      l.beginPath(),
      l.moveTo(e, t),
      l.lineTo(s, i),
      l.stroke(),
      l.restore();
  }),
  (Stage.prototype.start = function () {
    this.started || ((this.started = !0), this.clearFPS(), this.tick());
  }),
  (Stage.prototype.forceRender = function () {
    this.started && this.tick();
  }),
  (Stage.prototype.stop = function () {
    this.started = !1;
  }),
  (Stage.prototype.clearFPS = function () {
    (this.lastFPS = this.fps),
      (this.fps = 0),
      this.started && (this.tmFPS = setTimeout(this.clearFPS, 1e3));
  }),
  (Stage.prototype.setTextStyle = function (e, t, s, i, a, r) {
    var o = r ? r : this.canvas,
      n = o.getContext("2d");
    (n.fillStyle = i), (n.strokeStyle = a);
    var h = "";
    s && (h += s + " "),
      t && (h += Math.floor(t * Utils.globalScale) + "px "),
      e && (h += e),
      (n.font = h);
  }),
  (Stage.prototype.drawText = function (e, t, s, i, a, r, o) {
    var n = o ? o : this.canvas,
      h = n.getContext("2d");
    "undefined" == typeof i ? (h.globalAlpha = 1) : (h.globalAlpha = i),
      a || ((t -= this.viewport.x), (s -= this.viewport.y)),
      (t *= Utils.globalScale),
      (s *= Utils.globalScale),
      r && (t -= this.getTextWidth(e) / 2),
      h.fillText(e, t, s);
  }),
  (Stage.prototype.strokeText = function (e, t, s, i, a, r, o) {
    var n = o ? o : this.canvas,
      h = n.getContext("2d");
    "undefined" == typeof i ? (h.globalAlpha = 1) : (h.globalAlpha = i),
      a || ((t -= this.viewport.x), (s -= this.viewport.y)),
      (t *= Utils.globalScale),
      (s *= Utils.globalScale),
      r && (t -= this.getTextWidth(e) / 2),
      h.strokeText(e, t, s);
  }),
  (Stage.prototype.getTextWidth = function (e, t) {
    var s = t ? t : this.canvas;
    return s.getContext("2d").measureText(e).width;
  }),
  (Stage.prototype.render = function (e, t, s, i) {
    if (e) {
      i || (i = 0);
      var a = e.getContext("2d");
      if ((a.setTransform(1, 0, 0, 1, 0, 0), !s)) {
        var r = this.getFillStyle(e);
        r
          ? ((a.fillStyle = r), a.fillRect(0, 0, e.width, e.height))
          : this.clearLock || this.clearScreen(e);
      }
      this.prepareCanvas(e),
        this.moveCanvasAnchor(e),
        this.prepareCanvasShadow(e),
        Utils.callSuperMethod(Stage, this, "render", e, t, i),
        this.restoreCanvasShadow(e),
        this.moveCanvasAnchor(e, !0),
        this.restoreCanvas(e);
    }
  }),
  (Stage.prototype.createTween = function (e, t, s, i, a, r) {
    var o = new Tween(e, t, s, i, a, r);
    return this.tweens.push(o), o;
  }),
  (Stage.prototype.removeTween = function (e) {
    var t = null;
    if (isNaN(e)) {
      for (var s = 0; s < this.tweens.length; s++)
        if (this.tweens[s] === e) {
          t = s;
          break;
        }
    } else t = e;
    return (
      isNaN(t) ||
        (this.tweens[t] && this.tweens[t].pause(), this.tweens.splice(t, 1)),
      t
    );
  }),
  (Stage.prototype.clearObjectTweens = function (e) {
    for (var t = 0; t < this.tweens.length; t++)
      this.tweens[t].obj === e && (this.tweens[t].destroy = !0);
  }),
  (Stage.prototype.updateTweens = function (e) {
    for (var t, s = 0; s < this.tweens.length; s++)
      (t = this.tweens[s]), t.destroy && ((s = this.removeTween(s)), s--);
    for (s = 0; s < this.tweens.length; s++)
      (t = this.tweens[s]),
        !t.newly && t.tick(e) && (t.destroy = !0),
        (t.newly = !1);
  }),
  (Stage.prototype.setTimeout = function (e, t) {
    var s = new StageTimer(e, t);
    return this.timers.push(s), s;
  }),
  (Stage.prototype.clearTimeout = function (e) {
    e && (e.destroy = !0);
  }),
  (Stage.prototype.setInterval = function (e, t) {
    var s = new StageTimer(e, t, !0);
    return this.timers.push(s), s;
  }),
  (Stage.prototype.clearInterval = function (e) {
    this.clearTimeout(e);
  }),
  (Stage.prototype.removeTimer = function (e) {
    this.timers = Utils.removeFromArray(this.timers, e);
  }),
  (Stage.prototype.updateTimers = function (e) {
    for (var t, s = 0; s < this.timers.length; s++)
      (t = this.timers[s]), t.destroy && (this.removeTimer(t), s--);
    for (s = 0; s < this.timers.length; s++)
      (t = this.timers[s]),
        !t.newly && t.update(e) && (t.destroy = !0),
        (t.newly = !1);
  }),
  (Stage.prototype.tick = function () {
    Stage.TIMER_MODE == Stage.TIMER_MODE_FRAME && clearTimeout(this.tmMain);
    var e;
    if (Utils.isWindowHidden) (this.lastTick = 0), (e = this.delay);
    else {
      var t = new Date().getTime(),
        s = Math.min(Stage.MIN_DELTA, t - this.lastTick);
      if (
        ((this.lastTick = t),
        this.hasEventListener("pretick") &&
          this.dispatchEvent("pretick", { target: this, delta: s }),
        !this.started)
      )
        return void (this.lastTick = 0);
      if ((this.updateTweens(s), !this.started))
        return void (this.lastTick = 0);
      if ((this.updateTimers(s), !this.started))
        return void (this.lastTick = 0);
      this.hasEventListener("prerender") &&
        this.dispatchEvent("prerender", { target: this, delta: s });
      var i = !1;
      if (
        (this.drawBackAlways
          ? (this.render(this.canvas, !0, !1, s), (i = !0))
          : this.needToRebuildBack &&
            ((this.needToRebuildBack = !1),
            this.backgroundCanvas && this.render(this.backgroundCanvas, !0)),
        this.render(this.canvas, !1, i, s),
        this.showFPS)
      ) {
        var a = this.canvas.getContext("2d");
        a.save(),
          this.setTextStyle("sans-serif", 10, "bold", "#fff"),
          (a.shadowColor = "#000"),
          (a.shadowBlur = 4 * Utils.globalScale),
          this.drawText("FPS: " + this.lastFPS, 2, 10, 1, !0),
          a.restore();
      }
      this.hasEventListener("posttick") &&
        this.dispatchEvent("posttick", { target: this, delta: s }),
        (e = new Date().getTime() - t),
        (e = this.delay - e),
        1 > e && (e = 1),
        this.fps++;
    }
    this.started
      ? Stage.TIMER_MODE == Stage.TIMER_MODE_FRAME
        ? (this.tmMain = setTimeout(this.tick, e))
        : requestAnimationFrame(this.tick)
      : (this.lastTick = 0);
  }),
  (Stage.prototype.box2dSync = function (e) {
    for (var t, s = e.m_bodyList; s; s = s.m_next)
      s.sprite &&
        ((s.sprite.rotation = s.GetRotation()),
        (t = s.GetPosition()),
        (s.sprite.x = t.x),
        (s.sprite.y = t.y),
        s.sprite.hasEventListener("box2dsync") &&
          s.sprite.dispatchEvent("box2dsync", { target: s.sprite }));
  }),
  (Stage.prototype.processTouchEvent = function (e, t) {
    var s = e.length;
    !Stage.MULTITOUCH_ENABLED && s > 1 && (s = 1);
    for (var i = 0; s > i; i++) {
      var a = { clientX: e[i].clientX, clientY: e[i].clientY };
      this[t](a);
    }
  }),
  (Stage.prototype.prepareEventTouches = function (e, t) {
    return e[t] || (e[t] = [{ clientX: e.clientX, clientY: e.clientY }]), e[t];
  }),
  (Stage.prototype.restoreFocus = function () {
    this.inputController &&
      (window.focus && window.focus(),
      document.body.focus && document.body.focus(),
      this.inputController.focus && this.inputController.focus());
  }),
  (Stage.prototype.inputListeners = null),
  (Stage.prototype.addInputListeners = function (e) {
    if (
      ((e = e || this.inputController || this.canvas),
      this.removeInputListeners(),
      (this.inputController = e),
      !this.inputController)
    )
      return !1;
    (this.inputListeners = {}),
      (this.inputListeners[Utils.getTouchStartEvent()] = Utils.proxy(function (
        e
      ) {
        return Utils.touchScreen
          ? (this.restoreFocus(),
            this.processTouchEvent(
              this.prepareEventTouches(e, "changedTouches"),
              "checkMouseDown"
            ),
            this.processTouchEvent(
              this.prepareEventTouches(e, "changedTouches"),
              "checkClick"
            ),
            Utils.preventEvent(e))
          : void 0;
      },
      this)),
      (this.inputListeners[Utils.getTouchMoveEvent()] = Utils.proxy(function (
        e
      ) {
        return Utils.touchScreen
          ? (this.processTouchEvent(
              this.prepareEventTouches(e, "changedTouches"),
              "checkMouseMove"
            ),
            Utils.preventEvent(e))
          : void 0;
      },
      this)),
      (this.inputListeners[Utils.getTouchEndEvent()] = Utils.proxy(function (
        e
      ) {
        return Utils.touchScreen
          ? (this.processTouchEvent(
              this.prepareEventTouches(e, "changedTouches"),
              "checkMouseUp"
            ),
            Utils.preventEvent(e))
          : void 0;
      },
      this)),
      (this.inputListeners.click = Utils.proxy(function (e) {
        return Utils.touchScreen
          ? void 0
          : (this.restoreFocus(), this.checkClick(e), Utils.preventEvent(e));
      }, this)),
      (this.inputListeners.mousemove = Utils.proxy(function (e) {
        return Utils.touchScreen
          ? void 0
          : (this.checkMouseMove(e), Utils.preventEvent(e));
      }, this)),
      (this.inputListeners.mousedown = Utils.proxy(function (e) {
        return Utils.touchScreen
          ? void 0
          : (this.restoreFocus(),
            0 == e.button && this.checkMouseDown(e),
            Utils.preventEvent(e));
      }, this)),
      (this.inputListeners.mouseup = Utils.proxy(function (e) {
        return Utils.touchScreen
          ? void 0
          : (0 == e.button && this.checkMouseUp(e), Utils.preventEvent(e));
      }, this)),
      (this.inputListeners.contextmenu = Utils.proxy(function (e) {
        return Utils.touchScreen
          ? void 0
          : (this.restoreFocus(),
            this.checkContextMenu(e),
            Utils.preventEvent(e));
      }, this));
    for (var t in this.inputListeners)
      Utils.bindEvent(this.inputController, t, this.inputListeners[t]);
  }),
  (Stage.prototype.removeInputListeners = function () {
    if (this.inputController && this.inputListeners)
      for (var e in this.inputListeners)
        Utils.unbindEvent(this.inputController, e, this.inputListeners[e]);
    this.inputListeners = null;
  }),
  (Stage.MIN_DELTA = 500),
  (Stage.TIMER_MODE_FRAME = 0),
  (Stage.TIMER_MODE_TIME = 1),
  (Stage.TIMER_MODE = Stage.TIMER_MODE_FRAME),
  (Stage.MULTITOUCH_ENABLED = !0),
  (function () {
    var e = function (e) {
        setTimeout(e, 1e3 / 60);
      },
      t =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        e;
    Utils.detectMobileBrowser() && (t = e), (window.requestAnimationFrame = t);
  })();
var ExternalAPI = {
    type: "default",
    init: function () {},
    exec: function () {
      var e = arguments[0];
      if ("exec" != e && "function" == typeof ExternalAPI[e])
        return ExternalAPI[e].apply(
          ExternalAPI,
          Utils.getFunctionArguments(arguments, 1)
        );
    },
    check: function () {
      return !1;
    },
    openWidget: function () {},
    closeWidget: function () {},
    getMoreGamesURL: function (e, t) {
      return "http://playtomax.com/";
    },
    getPreloaderURL: function () {
      return "http://playtomax.com/";
    },
    getMoreGamesButtonDisable: function () {
      return !1;
    },
    getSocialButtonsEnable: function () {
      return !0;
    },
    getTwitterEnable: function () {
      return ExternalAPI.getSocialButtonsEnable();
    },
    getFacebookEnable: function () {
      return ExternalAPI.getSocialButtonsEnable();
    },
    showCopyright: function () {},
    showAds: function () {
      window.Advertizing && window.Advertizing.show && Advertizing.show();
    },
    sendGAEvent: function (e, t, s, i) {
      window.ga && (i || (i = 0), ga("send", "event", e, t, s, i));
    },
    openPlayMarket: function (e, t, s) {
      var i = "https://play.google.com/store/apps/details?id=" + e;
      (i += "&referrer=utm_source%3D" + t),
        (i += "%26utm_medium%3Dbutton%26utm_campaign%3D" + s),
        window.open(i, "_blank");
    },
    shareTwitter: function (e, t) {
      t || (t = "en");
      var s =
          "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(e) +
          "&lang=" +
          t,
        i = window.open(s, "_blank");
      i ? i.focus() : (window.location.href = s);
    },
    trackGameEvent: function (e, t) {
      var s = window._gameEventCounter || {};
      "undefined" == typeof s[e] && (s[e] = {}),
        "undefined" == typeof s[e][t] && (s[e][t] = 1),
        ExternalAPI.exec(
          "sendGAEvent",
          Utils.getGameID() || "Unknown_Game",
          e,
          t,
          s[e][t]++
        ),
        (window._gameEventCounter = s);
    },
    setMixer: function (e) {
      ExternalAPI.mixer = e;
    },
    pauseSounds: function () {
      var e = ExternalAPI.mixer || window.mixer;
      try {
        for (var t = 0; t < e.channels.length; t++) e.channels[t].pause();
      } catch (s) {}
    },
    resumeSounds: function () {
      var e = ExternalAPI.mixer || window.mixer;
      try {
        for (var t = 0; t < e.channels.length; t++) e.channels[t].resume();
      } catch (s) {}
    },
    getLanguage: function () {
      var e = (Utils.parseGet().lang || "").substr(0, 2).toLowerCase();
      return (
        e &&
          window.I18 &&
          I18.supportedLanguage.indexOf(e) < 0 &&
          (e = I18.currentLocale),
        e
      );
    },
  },
  TTLoader = {
    endCallback: null,
    loadedData: null,
    landscapeMode: !1,
    skipPlayButton: !1,
    completed: !1,
    create: function (e, t, s, i) {
      (TTLoader.endCallback = e),
        (TTLoader.landscapeMode = t),
        (TTLoader.skipPlayButton = s),
        (document.getElementById("progress_container").style.background =
          "#fff"),
        (document.getElementById("progress_container").style.zIndex = "1000");
      var a = document.getElementById("progress");
      a.setAttribute("valign", "top"),
        (a.style.verticalAlign = "top"),
        (a.style.background = "#fff");
      var r = document.createElement("div"),
        o = document.createElement("a");
      o.setAttribute("id", "tt_load_logo_c");
      var n = window.ExternalAPI
          ? ExternalAPI.exec("getPreloaderURL")
          : "http://playtomax.com/",
        h = "_blank";
      if (!i && n) {
        var l = "click";
        Utils.touchScreen &&
          !Utils.isWindowsPhone() &&
          (l = Utils.getTouchStartEvent()),
          Utils.bindEvent(o, l, function () {
            var e = window.open(n, h);
            e ? e.focus() : (window.location.href = href);
          });
      }
      o.setAttribute("href", "javascript:void(0)"),
        o.setAttribute("target", "");
      var p = new Image();
      p.setAttribute("id", "tt_load_logo"),
        p.setAttribute("border", ""),
        (p.src = TTLoader.logoSrc),
        (p.style.cursor = "pointer"),
        o.appendChild(p),
        r.appendChild(o),
        a.appendChild(r);
      var r = document.createElement("div");
      r.setAttribute("id", "tt_load_progress_cont"),
        r.setAttribute("align", "left"),
        r.setAttribute(
          "style",
          "padding: 1px; border: 2px solid #e44d26; background: #fff; position: relative"
        );
      var d = document.createElement("div");
      d.setAttribute("id", "tt_load_progress"),
        d.setAttribute("style", "width: 0px; background: #e44d26;"),
        (d.innerHTML = "&nbsp;"),
        r.appendChild(d);
      var c = new Image();
      (c.width = 76),
        (c.height = 80),
        (c.src = TTLoader.html5LogoSrc),
        (c.style.position = "absolute"),
        (c.style.top = "-12px"),
        (c.style.left = "50%"),
        (c.id = "tt_load_html5_logo"),
        r.appendChild(c),
        a.appendChild(r);
      var r = document.createElement("div");
      r.setAttribute("id", "tt_load_play");
      var u = new Image();
      u.setAttribute("id", "tt_load_button"),
        (u.src = TTLoader.buttonDisabledSrc),
        (u.style.visibility = TTLoader.skipPlayButton ? "hidden" : "visible"),
        r.appendChild(u),
        a.appendChild(r),
        Utils.addEventListener("fitlayout", TTLoader.setSizes),
        TTLoader.setSizes();
    },
    setSizes: function () {
      var e = Utils.getWindowRect();
      (document.getElementById("progress_container").style.width =
        e.width + "px"),
        (document.getElementById("progress_container").style.height =
          e.height + "px");
      var t = Utils.globalScale * Utils.globalPixelScale;
      TTLoader.landscapeMode ||
        (document.getElementById("progress").style.paddingTop =
          Math.floor(80 * t) + "px"),
        (document.getElementById("tt_load_progress_cont").style.width =
          Math.floor(200 * t) + "px"),
        (document.getElementById("tt_load_progress").style.height =
          Math.floor(12 * t) + "px"),
        (document.getElementById("tt_load_progress").style.width =
          t * TTLoader.progressVal * 2 - 1 + "px"),
        (document.getElementById("tt_load_logo").style.marginTop =
          Math.floor(80 * t) + "px"),
        document
          .getElementById("tt_load_logo")
          .setAttribute("width", Math.floor(300 * t) + "px"),
        document
          .getElementById("tt_load_logo")
          .setAttribute("height", Math.floor(65 * t) + "px"),
        document
          .getElementById("tt_load_button")
          .setAttribute("width", Math.floor(65 * t) + "px"),
        document
          .getElementById("tt_load_button")
          .setAttribute("height", Math.floor(29 * t) + "px"),
        (document.getElementById("tt_load_button").style.marginTop =
          Math.floor(30 * t) + "px"),
        (document.getElementById("tt_load_html5_logo").width = 30 * t),
        (document.getElementById("tt_load_html5_logo").height = 33 * t),
        (document.getElementById("tt_load_html5_logo").style.top =
          "-" + 8 * t + "px"),
        (document.getElementById("tt_load_html5_logo").style.marginLeft =
          "-" + 15 * t + "px");
    },
    progressVal: 0,
    showLoadProgress: function (e) {
      0 > e && (e = 0),
        e > 100 && (e = 100),
        (TTLoader.progressVal = e),
        TTLoader.setSizes();
    },
    loadComplete: function (e) {
      TTLoader.showLoadProgress(100), (TTLoader.loadedData = e);
      var t = document.getElementById("tt_load_button");
      Utils.bindEvent(t, "click", TTLoader.close),
        Utils.bindEvent(t, Utils.getTouchEndEvent(), TTLoader.close),
        (t.style.cursor = "pointer"),
        (t.src = TTLoader.buttonSrc),
        (document.getElementById("tt_load_button").style.display = "block"),
        TTLoader.skipPlayButton && TTLoader.close();
    },
    close: function (e) {
      TTLoader.completed ||
        ((TTLoader.completed = !0),
        Utils.removeEventListener("fitlayout", TTLoader.setSizes),
        clearTimeout(TTLoader.animateTimeout),
        TTLoader.endCallback(TTLoader.loadedData));
    },
    logoSrc:
      "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGMEE3ODFBRDlFQTExRTNCQzlFRkU2NDEyNEFGQjIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGMEE3ODFCRDlFQTExRTNCQzlFRkU2NDEyNEFGQjIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkYwQTc4MThEOUVBMTFFM0JDOUVGRTY0MTI0QUZCMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkYwQTc4MTlEOUVBMTFFM0JDOUVGRTY0MTI0QUZCMjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCACCAlgDAREAAhEBAxEB/8QAxAABAAIDAQEBAAAAAAAAAAAAAAYHBAUIAwECAQEAAgMBAQAAAAAAAAAAAAAABQYDBAcCARAAAQMDAQQGBAoFCQUIAwAAAQIDBAARBQYhMRIHQVFhcSITgZEyFKGxQlJicoKiIxXBkrIzY8LSU3OjsyQWJtFDg1QX8OHTNER0lCVkNUURAAIBAgIFCQYFAwIGAwEAAAABAgMEEQUhMUFREmFxkbHB0TITBvCBoSJSM+FCciMUYjQV8ZKCssJDJBai0lPi/9oADAMBAAIRAxEAPwDqmgFAKAUAoCLai5maOwKlty5welI9qLGHmuA/St4U/aUK0619Sp63p5CUtMmua+mMcI73oX4+4iw5p6zzB/0xpV1xk7BJk8RT2HZ5aPvmtT/IVZ/bh0+3aSv+EtqP36yx3L2b+B+gzz7mG6noGPQr5P4ZI9SXvjpheS+le3vPnFlMNk59P4A4LnUk3/zJC4/mHh/8CnlXf1r29w/k5Y/+1P2/4h5nPmCeMpgZNtO0pHlgkejyK+43kfpl7e4+YZVPR88On/8AoI5u53FKSjVemZMFBO2SxcoA67Lsn1Lp/kpw+5Br29toeQUqv9vVjLkf4dxMtO650tqFIGMnocfIuYq/w3h/w1WJ7xsreo3dOp4WQ93lle38cXhv1rpN9WwaAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKA0+p9WYTTUD3zKPcAVcMsI8TrqgL8KEdPadw6TWCvcQpRxkzcsrGrcz4aa53sXOVyh/mLzGPEwo6e0uvYFji8x5G7YRwqc9HCj61RmNe61fJT6+/qLE42eXa/3a/wXd8Zcx6PtcqeX5DPkHNZ5GzyrJfeCzsFxsaZudwtxd9fWra20YcU+n8EfIyv7/Tj5dLoXfLqJ3GY1HlsBea8cDOk+NtuHwOrjoPsoWp1CkqX86yR1DrqRipzhp+RvdsIGcqNKr8q82K+rFcXLoerdpKy1Zy05jJK30ZV/PsC54fOW08AP4RV5Z+yfRUTc2NfXxOa5yzWGc2epwVJ8ya6dZW0iO/Hkrjym3GJTf7xl4KQ4O9KrGoqUWng9ZZITUo4xaceTUesafkIqwuLMkR1jcWnnEfEqvsZyWpte88zpQksJRi+dIkuL5pa1gDgcmJyUc7FsTkBziB6ONPCv1k1t07+rHbxLlIyvkltU0qPA98dHw1GxTM5Z6pcSJsdWk82ogtzo5Hupc2WJI4Up29YSfpVl4retrXlz3rV7dBrune2q+V+fT+l+LD25+YkTWqtc6EW01qZBzmnVkBnMMeJxKVbuJR39y9/Qo1sq4rW+ip88Pq9vblI+Vja3yboftVtsHq9ub3pFmYfM4zMQG5+NkJkxXfZcR0Eb0qB2pUOkHbUrTqxnHii8UVm4t50ZuE1hJGZWQwigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFARnXeucdpPF+e8A9OfumFDBsVqG9Sj0IT0n0DbWpd3caMcXr2Ik8syyd1PBaIrW/baRDSmgZuYlnV+vF+a8sebHx73haabHiBdSdiUp3hvd0qua0re0c35tbo9urpJe+zSNGP8e00LU5LW3ycvL0aDT685tyZxcxemnDFxqfA5kEeFx4DZZn5iPpbz0WG/Bd5i5fLT0R39xuZXkMYYVK64p/TsXPvfJqHJjRaJ01Wo5jd4kJwpgIV8uQPbdN9/l7gfnd1fcsteJ+Y9S1c589RZjwR8mL+aS+bkju9/UXYpSUpKlGyQLkncAKnilJHjByEHIRkSoMhuVGc9h5lQWg+lNxXmE1JYp4oyVaUqcuGScXymHndNYLOx/IysNuUkewtQstHahYspPoNeKtCFRYSWJltryrQeNOTj7bUVNqrknk4QXJ088Z8cXJhPEJkJH0F7Eudxse+oa4yuUdMNK3bS2WPqOE/lrLhe9avethWzrbrTzjDzamn2jwusuJKFoUOhSTYioprB4PWWSLTSaeKZ+aH0k2kNe5LTwMJ5H5jgXbpkYt6ykhCvaLPFsT9Q+E9m+tq2u5U9D+aG7uIy/yuFx8y+SqtUl29+slJiPaaQNbaAeM3TcjxZTEEk+WE+1dJupPB+sjtTW5wul+7R0w2r29lzEX5iuf/Fu1w1l4Z7/9eiXIy1NNakxmosQ1k8cviZc2LbPttuD2m1joUP8Av3VL0K8aseKJVryznb1HCevr5UbSsxqigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQGBnc1BwmJk5ScvhjxkFRA9pR3JQkdKlK2CsdWqqcXJ6kZ7W2lWqKnHWyttAafm6tzbmudSI4m+O2Ihna2AgnhUAfkNn2fnKurqqKs6LrT86p7l7e20sma3cbSkrWjr/ADvb/q9u5aDVc3NfLyMt3TmMdtjo6uHIvIP751J2tA/MQfa6zs3CsOY3nE+CPhWvlNvIcrVOKrTXzvw8i3872chXuOx8rJZCLjoovJmOpZa7Co7VHsSLqqNhBykorWywVqsacHOWqKxOo8NiYmIxUXGRE8MeI2ltsdJtvUe1R2mrbSpqEVFakcvuK8qtRzlrk8SKc3tRqxGk3I7C+CZlFe6skGxCCLurHcjZ3mtTMa/BTwWuWjvJXILTzbhSfhh83d8SjMNmcthJIk4iW5Cd2cQbPgXboW2boWO8VXqVWVN4xeBebi3p148NSKkvbU9aLY0nzthSCiJqRpMJ82AntXMdR+mnapr4U9oqZt80T0VNHLs/Aqd96blH5qD4l9L8Xu39ZaDLzLzSHmVpcacAUhxBCkqB3EEbCKlk01iisSi4vB6GR7V2g8Bqdj/GNeTOQLMZBmyXkdQJ+Wn6Ktla1zaQqrTr3khYZpVtn8rxjti9X4PlRRGrNGZvS8wM5BAciuG0ae2D5TnYfmL+ifReq9cWs6Twlq3l7sMxpXUcYeJa47V3rlNFWubxIdEayl6Wy3vA4ncZIITkog2hSN3mJHz0D1jZWza3LpSx/K9aI/MsvjdU8NU14X2cz+Gsm04J0BqCNqfCq8/RecKPfWGtqGyvxJUgeniR6UdVb8//ABpqpD7U9ft1dBC0/wDz6LoVdFzS1N7fbb7nvLdjvsyGG5DCw4y8lLjTidoUlQukjvFTSaaxRUZxcW09DR+6+nkUAoCM5XmNpLE5l3EZKYYsplKFrUttZbs4OJPjSCN1atS9pwlwyeDJOhlFxVpqpCPFF8qx0chusbmsRlGvNx01mWi17suJXbvAOys0KsZ+FpmlWtqlJ4Ti486MyshhFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAR3Kcw9GYqa7Bn5RtmWwQHWeFxakkgKAPAlXQa1al5Sg8JS0kjQym5qxU4Qbi9ug16+b+gE7sipX1WHj/IrH/kqO/4M2FkF39PxXeeZ5yaCH/q3j3R3v5tfP8AJ0d/wZ6/9eu/pX+5H5/6zaD/AOZf/wDju/za+f5OjvfQz7/67d7l/uQ/6z6D/wCZf/8Aju/zaf5OjvfQx/67d7l/uR9HOXQZ/wDVvDvjvfzaf5Ojv+DPn/r139K/3I2eB5h6Tzs8Y/GzC5LUhTiWlNONkpRbisVJA2XrNRvKdR8MXpNa6ym4oQ45xwjzpkkraI0UAoBQCgFAeM2bEgxlypbqWI7dvMdWbJFyEi57zXmUlFYvUe6dOU5cMVi2e1ejwKAUAoBQCgPKLLjS2EvxnUvMqJCXEG6TwkpNiOoi1fIyTWKPc4Sg8JLBnrX08CgFAKAUAoBQCgFAKAUAoBQCgKm1+9I1hrmBouIsjHwyJGVcR1gXV6UIUAPpK7KhrxuvWVJalpft7ay2ZXFWdrK5l45aI+3K/giTcxtRt6T0iGMcAxLfAh41CdnlgJsVj+rQNnbatu9reTSwjrehe3IRmUWjurjGemK+aXLye9nPSQALD1nafTVZOgssnkdhBKz8vLuJu3jmg0yf4z+8+hsfDUrlVLGbl9PaVz1Lc8NKNNfneL5l+PUXfU+Ug5/5wZ38z1g5EbVePiWxHSBu81dlun9lPoqt5lV46uGyOgv+QW3l2yk9dR4+7UiDlSQQCQCdw66jybwPtfQSHSOus9pZ4CEvz8eo3exrpPlG+8tnb5au0bOsGtm2u50Xo8O4j7/LKV0vm0T+pa/fvRfWk9ZYXU8H3jHuWebsJMNyweaUehSeo9ChsNWK3uYVVjHoKHfZfVtpYTWjY9j9txtMhj4ORhuwpzCJMR9PC6y4LpUP+241mnBSWDWKNWlVlTkpQeEkUNzB5aTdMrXPhccrBKO1w+JyNc7Eu9aOpf63Wa7eWLpfMtMOovmVZzG5+SXy1fhLm5eToITWgTRZvKrJxczishoXLHjivtLdgXO1KSbuIT2oWQ4mpXL6inF0Zanq9viVnPKMqNSN1T8SeEuzpWhki5S5SZAeyWicoq83DLJiKOzjjqPyb9A4godiuytrLqji3Rlrjq5iOz2jGooXVPw1Nf6vbqLIqUK4KAUBzPr+UZWuM26TcJklpJ7Gkpb/AJNVS8ljWlznS8qhw2tNf049Ok0LSlsvB9hamX07UutKKFjuUkg1rrQ8Ub8kmsHpXKTbT3N7VuKUluYsZeIN6JB4XgPovJG37YNb9HMqsNfzLl19JCXeQW9XTH9uXJq6O4tvSfMHTmpkhuG8WZ4F3ID9kPC28pFyFp7Uk1NW95Tq6te4qV9lVa20yWMfqWr8PeSWtojRQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUBR/NHQ+oHNXvz8Zj350XIIQ6VMI4+B1ADa0q6r8IIqv39pPzXKKbUi75JmVFW6hOSjKGjTu1kWGgdcEX/Ipf6qP51an8Ot9LJT/KWv/wCkTAyeAzuKShWUx78JDh4W1vJslSgL2BBO21Y50Zw8SaNijdUqv25KWG4wKxmc2eO0vqXJxxJx2LkS4xJSH2kgoKkmxFyRurLChUmsYxbRrVr2hSfDOcYvczLOgtcD/wDhS/1Ufzq9/wAOt9LMP+Utf/0iTDlLo3UMTVpyOTx78FiJHcShT6QnjW6QkBO03sASa3sutZxqcUk1giIz7MKM7fghJScpLVswLkdlxWXWmnnm23XyUstrUEqWRvCQTdXoqbcktDZTo05NNpNpaz1r0eBQCgFAKAgHO7ICPosw7+LISGmCnrQkl1fwIqNzSeFLDeyf9N0uK54voi32dp95R6yObwxxkxziymMSlClK3usbm3O0j2VdvfX3LrnzIcL8Ueo+Z9l/k1OOK+Sfwe1dqJ9UiQIoBQCgIlzO1WdPaadVHXw5KcTGg9aVKHjc/wCGnb32rSv7jyqejxPQiWyax/kV1j4I6Zd3vNXyQyPvGjfciq68dIcZAO8IWfNT+2axZVPGlh9LNr1JS4bni+uKfZ2Fg1JFfFAKAUAoBQCgFAKAUAoBQCgMXLZFnG4yXkHzZqI0t5fRsQkqt6bV4qTUYuT2GWhRdScYLXJ4Fe8k8Y+9DyeqJw4p2YkLAWrfwIUSvb1Fwn1CozK6balUeuTLD6jrJShQj4acfb4dZDecebOQ1gqGhV4+KaSykDd5rgDjh77cI9FaWZ1eKrhsiTHp628u24ts3j7loXaQao8nC/uTONETRDEgj8TIOuyVHp4SrgR91Aqx5ZDhop79JQfUNbjumvoSXb2kwyc9rH46VOeNmorS3l32bEJKv0Vu1JqMW3sIijSdSagtcngcqPSXpT7st8kvyVqedJ38Tiio/Cap7k28XtOqRgopRWpLDoLb5R6SxEjS2QyWajNPx8gsoAkJBQmPHuCq53ePiN+yprLreLpuU1ofUipZ9f1I14wpNpw3b3+GBhas5NKQyclpN73uMoeZ+XrWFKKTtuw6T4uxKj9qsdxlmjip6Vu7mZrH1Di+C4XDL6v/ALLZ7ugq9SVoWttaVIcbUUONrBSpKhsKVJO0EdRqJLOnisVqMjGZPIYue1kMc+qNMZ9h1PV0pUk7FJPSk16p1JQlxReDMdajCrBwmuKL9ukv7QHMWBqiP7u8Exc0ym78S/hWBs8xknapPWN6enrNjs71VVg9Et3cULNconavFfNTep9j5eslzjbbram3EhbawUrQoApUkixBB3g1utYkQm08VrKK5lcs14FTmXxCCvCKN32Bcqik9I6S1+z3VX76x8v5o+Hq/AvWT5yq+FOp93Y/q/8A66yG4LLuYbNwcq2dsN5LiwOlv2XE+lBNaNKpwTUtzJi6t1WpSpv8y+Oz4ls8w+HB6x05rSN/5Z5YhZBSRsU0seFR+wpXqFTF7+3VhVWrUyqZT+/bVbaWtfNHn/16y0AQRcbqlyrigFAcoZKQZOUnSDtL0l9y/wBZ1RqnTljJvlZ1ajDhhGO6K6j5BiPTZ0aEzbzpTqGGr7uJxQSL9m2vkIuTSW0+1aihFyeqKx6Daal0ZqTTaicpFIi34UTmT5kc7bC67Aov1LArNXtalLxLRv2GrZ5jRuftv5vpeh/j7jSpUtDiHG1KbdbIU24glK0qG5SVCxB7qwG41isHqLc5ec3FuuM4fUzo8xZDcXKGyQonYlD9tgUehe49NjvmrLMcflqdPeVLNshwTqUFo2x7Y9xbVTJUyM8xNVStM6bVkYjbbspTzTDKXblF3DtJCSk7Eg9Nal7cOlT4lrJPKbGNzW4JNqODbwKle51a6AU4Fw0hIJ4QwSNneuoZ5pW5OgtkfTlrq+bp/AvTCyJUnDwZEvh96ejtOP8AAOFPGtAUqwJNhc1YKTbim9eBRrmEY1JKPhUngZlZDCKAUAoCtOYPMxeD1TjMfEXePEcS/m7bbtuApDXelKvMPoqKvL7y6iitS8Xt8Sy5Vkyr0JzlrksIc629nSWS24262lxtQW2sBSFDaCCLgipRPErbTTwZq9Vagb09gZWXcjuSkRgCWWrAniUEgknYEgnaegViuK3lwcsMcDasbR3FVU01Hi3lNweb+olaqi5LJOhvEBRafxzI/CQy5sLhJ8S1o2Kue2wFQcMyn5ilLw7i41Mgoqg4QWNTWpPXitnImXyhaFoStCgpCgFJUk3BB2ggirEmURpp4M+0PhGuY2oHcFpGdMjueVMWAxDWLEh508KSL3HhF1eitS9reXSbWvYSWUWqr3EYtYx1vmRXumueGRYU3G1BFEtskIEyKAl25NhxNeyr7JHdUbQzWS0TWPKu4sN56ahLGVF8L3S1dPf0lzg3APX11OlMFAKAq/n0P/pcSeqYr+5VURm/gjz9haPS/wB2f6e1FMVBlyL95Li2hI/bIkH+1NWPK/srnZQfUX90/wBMeonVSBBmr1NqKBp7DP5Safw2hZtoe044rYhtHao/7aw160aUHJm1Z2k7ioqcdb+C3nNefzmRz+VcymSXxSVn8JKSeFhAN0ttfNCeveTtqrVqsqkuKWvqOk2ttChTVOGrr5WWXy25rOFxnCaje4lLIbhZNw7STsS2+fnfNX09O3aZWxzD8lR8z7ytZxkawdWiuePbHu6C3amioigFAKAprn1kOPI4fHDc007JV3rIbT8CVVB5vP5ox95cvS9LCE572l2lfadz0zAZqLlol1OR1Wda/pGlbHGz9Ybu21RlGs6c1JbCfu7WNek6ctvwexnTuLyUPKY6PkITgdiym0usrHSlQvt7RuNWynNTipLUzmdajKlNwksJReBk17MQoBQHOHMfVP8AmLU777K+LHwrxoNtxSk/iOfbWPUBVXvbjzaja8K0I6PlFl/HoJPxy0y7F7usk3IjJeVmcpjVGyZLCJCB1qZVwK+64K2spnhOUd6xIz1PRxpwn9Lw6f8AQump4pYoBQHxa0NoUtaglCQVKUo2AA2kkmjZ9SbeCIdobmHG1RlMvEQkNoiOBePO3idinweYb9PGL9xFaNreKrKS3auYmMzymVrThJ/mXzckt3R1MmVbxDCgPjjjbaCtxQQhO1SlGwHeTXxvA+pN6EaVet9IpyDGO/Noy5shYaZZbcDhK1bk+DiAv21g/lUuJR4lizdWW3Dg58EuFaccDd1sGiKA1Der9MLyz2IGSYGSjqCXYylhKuIgHhHFYKO3cKwq5p8XDiuI23YV1TVTgfA9pt6zGoQXnTklQtBSkJ9qY61Ht1pKuNX3UGo/NJ8NF8ugnfTtHju0/pTfZ2ki0fjE4vS2KgJFixGbC/rqTxL+8TWzbU+CnGPIR2YVvNrznvkzmvMTVTszkZqzdUmU85fsLht8Fqq1WXFNve2dJt6fBTjHdFdRhOK4W1K+aCfUKxszJYs6i0hDTD0riIqRYNQ2QR2+WCfhq3W0eGnFciOX39Tjrzlvk+sj3OTJGHoeSyk2XPdaijr4VK4l/cQa1cznw0Wt+gkPT1Hjuk/pTZz+sqCTwi6vkjrPQKrbOgI6MmwEYLlfIgpHD7ninG1D6fknjPpUTVnlDy7drdHsOdU6vn3yl9VRdZRWmtWah04pBxMtTbIsVw3Lrjr72yfD3psar9C5qUvC/dsLzeWNG4+5HF79vT3kvyU7THMFCVgIweskpCWw6oCPMsNjfmWFz83i8Q7RW7OdO5/oq/BkRRpV8ve2rb8nijy4dezmK+kxpMWS7FlNKYlMKKH2HBZSFDoP6D01Gyi08HoaLBCcZxUovGL1MRpMmLJalRXVMSmFBbD7ZspCh0j9I6aRk08VoaE4RlFxksYvWi/eXHMWPqaN7nN4WM5HTd5obEvIGzzWr/eT8nuqx2V6qqwfjRQs3yh20uKOmk/hyPs3k1WhDiFIWkLQsFKkqFwQdhBBrfaIVNp4ooXmdy3On3F5TGIKsC+qzrQ2mKtZtb+qUfZPyd3VVdv7Ly/mj4Or8C+ZLnH8heXP7q/+X49ZKsw0c9yLaecHE/HhtPJI38cU8Kj+qlVbdVeZZ47l1EVby8jNGlqcmv8AcTfROTOT0liJytq3orfGfpJTwq+8mt+1nx0ovkITMqPlXE47pM3VbBpHlMd8qI+7/RtqV6kk15k8Ez3TWMkuU5LbVxICvneL17apqOsNYM32hW/M1tgk/wD5iFfqhSv0VsWixqx5zQzN4WtT9J0y8y080tp5CXGnAUrbWApKknYQQdhFWtpPQzmkZNPFaGU7zA5QmKhzK6YaUthN1SMUnaUjpVH/APD/AFeqoS8y3D5qfR3dxcMqz/iwp13p2S/+3f07yq/CtPzkq2EGoctWouXk/r12WBprKulcppBONkLN1ONJG1pRO9aBu6091TuW3nF+3LXsKbn+VqH79NfK/Etz38z6z7z7kKTicRGB8Lspa1D+raIH7dM3l8sVynz0vD9yct0etlMOi7ah1i3r2VBMucdZ1nCQG4bCBuQ2hI9CQKuUVoRyeo8ZN8p7V6PAoBQGt1LnY2CwczKydqIzZUlHStZ2IQO1SiBWKvVVODk9hs2dtKvVjTj+Z/6s5fly5M2W/Mlq8yVKcU7IX1rWbn0DcOyqlKTk23rZ0+nTjCKjHRGKwRenJvUhyemPy59fFMxBDBublTB2sq29Q8Poqw5ZX46fC9cerYUb1DZ+VX414amn37e/3k4mw482G/DkoDkeQhTTqDuKVixHqNb8oqSaepkHTqOElKOtPE5f1HgZOAzcvESbqMZX4Th/3jKtra/Snf23qpV6LpzcXsOn2l1GvSjUjt+D2ot3kvq73/FLwEty83GpBjFR2uRSbJ9LZ8J7LVNZZc8UeB649X4FR9RWHl1PNivlnr5Jfjr6SyalStlF86NTpyWdbw0dfFFxVy+RuVJWNo/4aDbvJqvZnX4p8C1R6y8+nbLy6Tqy8U9X6fxZpeWWBOZ1lCbWnijQT77J6RZo/hpP1nLeqsFjR46q3LSbuc3Xk20n+aXyr36/gdHVaDnIoBQFY8+R/wDQYw9U342l1E5v4I8/YWb0v92f6e1FLVBF0OgOTQtoOJ2vSD/bKqx5Z9le/rKB6h/u5c0eom5IAudgG81IEIc78zNZnUudLcZd8Rj1KbhgbnF7lv8Ap3J7O+qzfXXmz0eFau86Hk2XfxqWMvuT18m5d/KYWitE5LVWQUzHPkQGCPfJxFwi+0IQPlOHq6N5rHa2sq0sFoS1szZjmULWGL0yeqPa+Qx9YaRyOmcqrHzgHWHQVQ5QFkPNjfs6Fp+Un9Febm2lSlwv3PeZMvv4XNPjjoa1rc+7cyweVXMpRUzp3OPcSjZvGTnDtV0BhxR+V8xXTu375LL77/tz9z7Cv55k+utSX6o/9S7S3KmipCgFAc681cgJuvMjwm6IiWoqewoRxK+8s1WMwnxVnyaDomR0uC0j/Vi/boIlWmSxZ3JbWHuk1Wmpi7RpalO45SjsS9vca2/PHiT2366lsrucH5b1PUVn1Fl/HHz4+KOiXNsfu1F01OlLFAQXm7qs4XThhRnOHI5XiYaI9pDVvxXPQk8I7TUfmNx5cMF4pezJzIbHzq3FJfJDT79iKCACQABYAWA7BVbL8STlvkfy/XOJeJsh5wxV9Vn0lI+/w1t2U+GtF+7pI3OKPmWs1uWPQdJ1aTm4oBQFac6dWmDjEafiLtLyKSqWpJ2oig2I73T4e69RWaXHDHgWuWvm/Esvp2w45+dLww1fq/DuKp0nn16e1FCyqf3LK+CUkdMdzwuD0DxDuqHt63lzUvbAtV/aq4oyp7Xq51q7jp9txt1tLjagttYCkKG0EEXBFWxPE5i008Gfqvp8IrzK0r/mTS78ZpPFOjf4mEOhTiAfAesLTdNad9b+bTaWtaUSuT338eupPwvQ+bf7jnBGxILd2iCCkjwqSoG4PYUkVV0dGfLpOlOXuqk6k00xLcI9+Z/AnoHQ8gC6rdSxZQ76tNncebTT27Tm2bWP8au4rwvTHm/DUfeYGrUaZ087MQQqe9+DAaPynlDYoj5qB4jX28uPKhjt2DKrB3NZR/KtMub8dRzW6rzONyQrzVqJcdcXtKlE8SlG/STtqqvTrOkRWGhaDoPlLh8xj9LNu5SS+45MIejxHllYjs28CRxXIKh4iL9lWXLqco0/mb0/A5/ntxTqV2qaS4dDa/M9vcaTnoorh4CJ8mRkAFDr8PD/AC6wZtqgt8jd9MrCVWW6BZj/AIYznDs4UHhHcKlXqK1HTJHJaCSm53nae+qYjrLPy/8AuXPqn4qPUfY60dY4sAYyIBuDLdv1BVxp+Fcxyit45c7Ks5+TNmFgg7eJ6QofVSlCf2zURm8vCudlo9LU/uT5l2lcaVgJyGqMRCULoeltcY+ihXmK+BFRdvDiqRXKWO+q+XQnLdF9x0BzHWUaEzih/wAo4PWLVZL37MuYoOULG6p/qRzXVWOkHxSUqBSoAg7wa+BMzJmUmzWWG5i/eHIyfLZkr2vBroaWvetKfk8W0ddqySqOSWOnAxU6EYNuOji1rZjvw2cuGsxK8GUy8QjLLy0ROGDqsuHAqF5H7wLHTt2cNva4tlt9e6alxLg8WwxXDpqnLzcPLw04+3RtOosWckcbGOTDScj5afegwSWvMt4uAqsbXq20+LhXFrOX1+DjfBjwY6MdeB+8gIJgyBP8v3Etq95863l+Xbxcd9lrb6+zwwfFqPlLi4lwY8WOjDXiRDTLOHe5bS4+IU45iFNz24RfHi8orcA37eG/s322tetKgoug1Hw/Nh8SXvJVI3sXUw8zGGOG/R7M/PJaQp7l3jgTfylPNjuDqj+mvmVyxoL3n31FDC8ly4dROKkCDMLNq4cLPV1Rnj6mzWOr4HzGa2X7sf1LrOUmP3Df1R8VU9ajq0tbJLy6F9d4P/3B/ul1tWX3o85GZt/a1P09qOlatRzYUBzrzTXhzraajFspaDYSmcpB8K5R2rUE7gQCAq281WMwcfNfD7+c6JkiqfxY+Y8cfDyR2fhyGs0Vi5mT1biosRamnUvpfU8jYpttk8a1g93h9NYrWm51YpbzZzGtGlbzlLSsMMN7eosHn6o2wSejikn7rYqSzf8AL7yv+ll9z/h7So17E36ttQrLcjrSMbx2j1oT8VXOOo5NPWz0r6eRQCgKY546kMjIxdPMq/CiASpgHS6sENJP1U3V6RUFmtfGSgtmllz9NWfDB1nrloXNt7itokGZM8/3VlT3urK5Ujh+Qy3bjWe69RcYOWOGxYlknVjDDieHE8Fzs3/LjUf5Dq2JIcXwwpf+EmHoCHCOBZ+ou3ovWxZV/LqJ7HoZH5vZ+fbyS8UfmXu19KOkatJzgrnnNpFWTw6M3ERxTsWkl5KRcuRTtWO9s+MemovM7bjjxrXHqLF6ev8Ay6nlS8M/hLZ06ugpvCZmZhstFy0E3kRVcaU38LiDsW2exadlQdKq4SUlrRcrm3jWpunLVL4cvuL01PzKx0LRbGbxyw5JyaODGNK3h0jxlY/g7eLt2dNWGvfRjSU465avbkKNZZPOdy6U9EYeLm5P1bDn5a1ErcdWVrUSt1xRuVKJupSj2nbVbbL+lsRfXJ7SysRpz8wko4Z2WKXlAjxIZA/BR6jxHvqxZbb8FPieuXVsKH6gvfNrcEfDT0e/b3E9qRIEUAoCtOfA/wBOY49U0f3TlRWbfbX6uwsvpj70v0dqKTqBLqdBcnBbQMLtckH+2VVky37K9/Wc/wDUH93Lmj1I13OTWKsXiU4SE5w5DJpPnLSbKajblnsLnsj01izO54I8C1y6jY9PZf5tTzZL5IfGX4a+gp/Tun5uezEbEQQEuPHxuW8LTSfbcP1RuHSbCoSjRdSSii4Xd1GhTdSepfF7jpbA4LHYLFMYzHt+XHYFrnapaj7S1npUo7SatdGlGnFRjqOa3VzOvUc5vS/bAxtWaWx+pcM7jZg4SfHGkAeNp0DwrT+kdI2V4uLeNWPCzJYXs7aopx963rcc15fEzsVkZOLyLfly4yuFwC9iN6VoPzVDak1ValNwk4y1o6TQrxqwVSD+WXtgXFyq5jqyiEYHMO3yjSf8JJUf/MtpG5X8VI3/ADht66nMvveP5JeLZy/iU/PMo8p+bTXyPWvpfc/hqLLqVK0fFKSlJUo2SkXJ6gKH1LE5Syc5U/KTZ6zdUuQ69fsWskfBaqdOfFJy3s6rRp+XCMPpil8D1xeGnZNE9UNPGcdGVMfRtJLaFAEJt07b+ivtOk544flWJ4rXEKTjxfnlwrnMJtxxC23mHC262pLjLqDtSpJ4kqB7DXhPajM0mmmtB0noLVjWptPMzTZM1r8GeyPkvJG0gfNWPEnsNWm0uFVhjt2nN80sXbVnH8r0x5vw1EiWtDaFLWoJQgFSlE2AA2kk1tN4Eek28Ecza21MvUmpJOSBPuifwICT0MIJsq3Ws3Ue+qpdV/NqOWzZzHS8ts1bUVD82uXP+Go0Va5vH1D647jclvY5HWl5FuttQWPionhp3HxxUk4vbo6TrCHKblw2JTf7t9tDqO5aQofHVxjLFJ7zlNSDhJxex4HtXo8GPkchFx0CRPlrDcaK2p15Z6EoFzXmc1GLb1IyUaUqk1CPik8Dl7O5qXnMxLy0rY9LXxBHzGxsbbH1U/DVSq1XUk5PadPtreNCnGnHVH4vazB37DurGZy+eTepDk9Mflz6+KZiCGDc3KmCLsq29SfD6KsWWV+OnwvXHq2FE9Q2flV+NeGpp9+3v95PqkSAFAc+c19L/kmqFyWEcOPy3FIZsPCl6/4yPWeMd9VrMKHl1MV4Zae86DkV759Dhfjp6HzbH2Hjyx1Z/l7UiA+vhxmR4WJlzZKFX/CePR4SbE9R7K82Fx5VTT4Za+89Z1Y/yKOjxw0rtXttPHmLqxepNSOvNqP5dC4o8BPQUg+N3/iKGz6Nq+Xtx5tTH8q1GTKLH+NRSfjlpl2L3dZl8rtGf5iznvMpHFiMapK5F9zr3tNtdoHtL7LDpr3YWvmzxfhj7YGHO8x/j0uGP3J6uRbX2I6EqynPir+eQ4W9NyD7LWRHEfQFfyaiM1/I/wCos/prS6q3wLQIBBB2g7DUuVg5OmR1xZ0qKsWVHfdaI+o4U/oqmyjg2tzOr058UVJbUn8DGeBLKwN5SbeqvL1GSOs6q068H8BjHgbhyKwu/e2k1b6LxhF8iOWXceGtNbpPrKb55SA5q2GyP/Twhcdrjij8SRUHmssaqW5Fx9NQwt5PfPqSNbyijB/X0EkXSw0+93EI4B+3WLLo41lyYmzn0+G0lytL449hcXMhJVoPOJH/ACjnwC9Tl99mXMU/J3hd0/1I5sqrHSBQCgNxpjSWb1NMMbGM3bQbSZjlww19ZXyldSE7e7fWahbzqvCPTsNO9v6VtHim9OxbX7by/dG6Fw2lohRESXproAlT3APMcttsLewi+5I+E7asdtaQorRr3lCzDM6l1LGWiK1R2LvfKbybNiQYjsyY8liKwkreecPClKR0kmtiUlFYvUaNOnKclGKxkygeYfMeVqd1UKHxR8C2q6Wz4VyCk7FujoT0pR6T1CuXt66rwWiHWX7KcojbLilpqv8A+PIuXe+gs/RjJhcqIvmDhIx7r6r/AMQLc+JVS1suG2X6SsZjLjv3h9aXRgjx5JMqb5dwCf8AeOPrHcXVD9FecrWFBe89+pJY3kuZdRO6kSCMLNjiws8dcZ4f2ZrHV8D5jNbfdj+pdZykx+4b+qPiqnrUdWlrZI+XywjXODPXKt621itmz+9HnI3NVja1P09qOl6tZzUiXMXXUfTGKKWVJXmZaSmDH38PQXlj5iPhOytK9u1Sjo8T1d5LZRljuamn7cfE+xcrOdwH3ngkcciS+uwABW466s32AbVKUo1WdLe9s6HoS3RXQkX5yu0EvTePXNyCR+czkgPJBBDLQ2pZBG832rPX3VY7C08qOMvE/hyFCzvNP5E+GH24/F7+4j3P1P4eCX9OSn1pQf0Vq5v+X3kj6WemouSPaU++bMuHqSfiqFeot8daOsMS75uKhu/0jDavWgGrjTeMVzHKK8cKklysyq9mIUB4T5rEGDImyFcLEZtTrqupKAVH4q8zkopt7DJSpuclFa28DlfI5KRlMjKyUn9/NdU+sdXGfCn7KbCqhObnJye06lRoqlBQjqisC4+S+mGW9NSspLbCl5kqbSD/AMqi6AO5auI+qpvLKC8tyf5uop/qK9brKEX9v/m/DQVBnMQvE5efiHb3hvLZB3XRvQr0oINQtWnwScXsLdbXCq041F+ZY9/xOgOWOpTntJxnXl8U6H/hZnWVtgcK/tosqrJYV/MprHWtDKDnNn5Fw0vDL5l7+5kqUlKklKgCkixB2gg1uESngc38w9Iq0zqJxhpJGMl3fx6ugJJ8bXe2o7Po2qrXtt5U8F4Xq7jo+U3/APJopvxx0S7/AH9ZGipZSlJUShF+BBJKU8RurhG4cVttapJYEq5baPVqXUCQ+i+KgFL04ncs3u2z9si6vo99bljbebPT4Vr7iLzjMP41HR9yWiPa/d1nRgAAsNgG4VZznQoBQCgK257j/TEA9U5H905UVm321+osnpj78v0dqKRqBLsdCcnxbQGP7Vvn+3XVly37K9/Wc+z/APu5e7qRUXMqHmY2tMgrLHjdkq82I6AQhUYeFsIvu4B4VDr76hb6M1VfFt1cxbsnqU5W0fL1LQ/1benqPXllquLpvUvnTQBBnIEaQ+Rta8V0L+rxbFdm3or7Y3CpVMXqeg8ZzYyuKOEfFHSlv3rn3HRYIUAQbg7QRuIqznOxQFL89pOIXlccwykHLstqMpxPyY6v3aF9pVdSey/XUFm0o8SS8XYXP0xCoqc2/tt6Ofayt4LE6RkIrGPKhkHXkJhqQbKS8VeBQI3cJ21FwTcko+LHQWSrKEYNz8CTx5jquKh9uKyiQ550hCEpeeACQtYAClcI2C522q4RTw06zlU2nJtLBGo1xkvy3SGXmD2m4rgR9ZY4E/eUKwXU+GlJ8huZbR8y4hHfJHMaEhKEpG5IA9VVNHTW8WW9yGxqTGzORcRcOrbioJ3FKElax63BU3lENEpe4qHqitppwWxOXZ2EI5h6TVprUbsdpJGNl3fx6ugJJ8bXe2o/q2qPvbfyqmH5XqJvKb/+TRTfjjol3+/rPvLvVytM6hQ88ojGTOFjIJ6Ei/get/DJ2/RvX2yufKni/C9feM2sP5NFpeOOmPavf1lk85tWCBg28NEc/wAXlknzFJO1MUe2bj+k9kempTM7jhhwLXLqK36eseOq6sl8tP8A5tnRrKPqALuSl/Sxi8tmdQvotImz2wwTvEQoWhP67ni7rVtu3wocb1uXwIuN9xXrorVGDx/VofwWgi1ahKHRfKzI+/aExairicjoVGcPawooH3QKs+Xz4qMeTR0HO87o8F1Pc9PTpJZW4RJVHPHU3BHjabjr8Ui0mfY/7pJ/DQfrrHFb6NQ2a19CprbpZa/TVli3WezRHn2v3LrKkiRJU2WxDiI82VJcS0w31rUbC/YN57KhoxcmktbLZUqRhFylojFYsmXMnQTemGMQ9Futh5n3ea9tPFLQOIudnmC9h9Gt6+tPKUWuZ85D5PmjuXNS1p4r9O73dpgcttRfkWrojziuGHN/wcu+wBLh/DWfquW9BNY7Gt5dVPY9DNjOLTz7eSXij8y92v4HR9Wg5wKAjHMbS/8AmLS8iK0kGfH/AMRBPT5rYPh+2m6fTWpe2/m02lrWlEnlF7/HrqT8L0S5n3azm8bRtBHWk7x1g1Vjo5mYjET8xk4+Mx6OOVJVwouPChPynF23JQNprJTpynJRjrZhuLiFGDnPwr2w950xprT0HT+Gj4qEPw2B43CLKccVtW4rtUatdCiqcFFHNby7ncVHUlrfwW42dZTVK/54QHJGh1yGk3chSGnr9QJLZP36jc1hjRx3MsHpqqo3WD/NFrt7CY4CejI4PHzkK4hJjtO37VIBPw1vUZ8UE96Ie6peXVlD6ZNFB808QrGa4n7CGZ/DMZPX5gs5buWk1XMwp8FZ8ukvuSXHmWsd8fl6NXwInWmSp0dyvme96Dw6yriW0z5C+wsqLf8AJqz2EsaMTnOdU+C7nyvHp0lSc4HCvX8wdDbEdA/UKv5VQ2ZP958yLbkCwtI8rkbHkY0F6tmOHe1BVb7bqB+ismUr91/pNf1NLC3it8+xluawj+8aUzDPz4T4Hf5ZIqauVjTkuRlSy+fDcQf9S6zl1s8TaVdYBqpI6e9Z6x2JEmQiNFaXIkuGzbDSStxXclNzXqKbeC0s8Tkorik8Ira9RZmkeSk2UUS9TLMWPsUMcyq7qh1OuJ2IHYjb2ipW2ytvTU0LcVq/9Rxj8tD5n9T1e5bff0FwY/HQcdDahQGERorI4W2W0hKQO4VNwgorBLBFQq1p1JOU3jJ7TGz2ocTgccuflHwwwjYkb1rV0IbSNqlHqFeK1aNOPFJ6DLa2lSvPggsX1crOf9b69yuq5VnQY2KaVxRseDfaNzjxHtL6uhPR11W7q8lWe6O7vL9luV07WOj5qj1y7FuXWR6LCfny2IDA4n5jqGGwN93FBN/Re9a0YuTUVtJGdRU4ub1RWPQdDa/kNYPlzkkNHhQzDERjo9sBlI9RqzXjVOg8N2HYc9yqLr3kG9suJ9Zl8vccrHaJw0VYstMVC1jtc/EP7Ve7OHDSiuQw5tW8y6qSX1dWgkNbJHnhPR5kGS389pafWkivM1imZKTwmnynJrIs0hPUAPVsqmrUdXlrNrpaSiLqjDSVmyGZrBUT0ArCT8CqzW8sKkXyo1L2HHQqRW2DLf1rzixOK44GE4MjlLlHmC5jtK3bVDa4ofNR6SKm7rMow0Q+aXwKjl3p+pV+er8kPi+7nZAMboHX2rZ68lPQtj3khT2QngoJHQG2RZfCB7KbJTUbCzrVnxS27X3E/WzS0tIcENOH5Y9r1dbLZ0dy3wGmLSGgZmUI4Vz3gOIA7w2kbGx3besmpm2soUtOuW8qeYZxVudD+WH0rt3krrcIoq7n2wVYjEP9DctaT9tpX82ojN18sXylo9Ly/cmt8e0phaeJJT1gioIuaZ09omUJekMM+NvHDYv3pQEn4qttrLGlF8iOY5lDguKi/qfWbqs5pCgK/wCdeZ9y0kICFWdyryWCP4SPxHPgSE+mo3NKvDS4fqJ/05b8dxxvVBY+/Uii2Yz0p9qIwCX5LiGWgN/E4oJHx1XlFt4LaXqU1FOT1JY9B1Vi8exjsbFgMCzMRpDKLbNiEhN/gq4U4KMVFbDldeq6k3N65PEpvnlhPds9DzDabN5BosPH+KxtT60K+CoPNaWE1Lf2Fx9NXPFSlTf5HiuZ/j1mv5Qaj/KdVJguqtDy4DCgdwfTctK+1tT6RWLLa/BUweqXXsNjP7TzaHGvFT0+7b3l/VZCgla894wXpqBJttYmpTfscbWP0VFZtH9tPlLL6YnhWlHfDqaKQcUUtqUNpSCfVUAy7JYs6c0RgIGD01DiQwfGhL77qvacdcSFLWr4h1CrZa0VTppI5nmV1OvXlKW/BciRva2DQFAKAUBXHPYf6VhHqnN/3blRebfbX6ix+mPvy/Q+tFH1AF3OhuUQty/xnaXj/bLqy5d9mPv6znuff3c/d1IztdaMiapwxirIanMEuQJRF/Lctaxtt4F7lD9IrJd2yrRw27DBlmYytanFri/Et671sOcZ0GXBmPwZzJYlx1FuQyrbY/pSRtB6RVXnBxbT1o6NTqRnFTi8YvUy1OUfMO3k6Yy7v0MTKWd46I6yekfI6xs6qmMuvf8Aty93d3FWz7Kddemv1L/q7+knOutaQtLYgyFgOz37ogRL7XHLb1W3ITvUf0mpC7ulRjjt2Ig8sy6V1UwWiC8T3fi9hzlMmS5st+bMdL8uSsuPunepR7OgDcB0CqvKTk23rZ0WnTjCKjFYRWos3klpMvSndTSkfhMcUfGg/KWdjro7vYHpqWyu3xfmP3dpWfUl9wxVCOt6Zdi7eguSpwpxX3O/Ie76PRESqy50ppu3Whu7qv2BUbms8KWG9lg9N0uK44vpi+7tKJqvF6OheUWP9z0JAURZcwuSlg/xVnh+4BVly6HDRXLpOfZ/V47qX9OEegztfaSa1Pp92GLJnM/jQHj8l5INgT81Y8KqyXlv5sMNuwwZXfu2rKX5XolzfhrObXGnG1uMvtlt5tSm3mVjalaTwqSodhqrNYaGdHUk0mninqPWTLlyltrkvKeW00hhpSzcpaaFkIHYkV9lJvWeYU4xxUVhi8fe9ZstI6be1JqCNikAhlZ8ya4PkR0Hxm/Wr2R2msttQdWaj08xrX94rai6j17OfZ3l280sYyeXWQYZbCG4TbTjDadyUsLSQB3JFT9/TXkNLZ2FKySs/wCZFt+JvH3nPVVo6CXLyFyBXisrjif/AC8hLyE/ReRY/ebNTmUT+WUdz6ym+qKWFSE98cOh/iWbKksRYz0p9QQwwhTjqzuCUDiUfUKlpSSWLKzCDlJRWtnLmezT+czUzLv3CpjhWhJ+Q0NjaPsoAqo1qrqTcntOo2tuqFKNNflXx2/EsXkfpcPSZOpJKLoY4ouPv88/vnB3DwD01J5VQxbqPmXaV31Le4RVGO3TLsXb0Fia708M/padjgLyCjzYh6n2vE36yLempO7o+ZTcduznK7ll35FeM9mp8z1nMtuNFiCkkWI6Qf8AaKqh0zUzpTlzqI57SUKW6rilsj3aZ/WteEn7Qsr01abKt5lNPbqZzfN7TyLiUV4XpXM/bAktbZGEC5sa3OCxQxsBzhzGRSQhSd7LG5bvf8lHbt6KjswuvLjwrxS+CJ7Ist8+pxzX7cPi93eUJsSAL9gv11XC+G40nqWTpvPR8qyCttH4ctkf7xhRHGkdotxJ7RWe3rulNSXv5jUvrONzSdN69j3PYdNQ5kabEZlxXA7GkIS4y4ncpKhcEVa4yUlitTOZ1KcoScZLBo9q9Hg12o8QjMYGfi17pbC2knqUR4T6FWNYq9Pjg470bNnXdGrGovyvEh3JPMLk6WcxMjwzMM8uO42d4QolSfUeJPorRyurjT4XriyX9R26jXVReGosfb4M/POnTK8jgG8vGRxSsSVLcCRcqjLt5n6lgv0GmaUOKHEtceo9enb3y6rpy8NT/m2dOoozftG6q+XguvkRkQ7p+fjz7UOUVp+o+kK/aSqp7KZ4wcdz6ylep6WFaM/qj1eyK+5pL49f5Y/NLKfUyioy/f70vd1FgyRYWkPf1skHIe3+ZMp1+5o/va2cp+5LmND1P9mH6uwuiWwJER5g7nm1Nn7QIqdksU0UynLhknuZUun+QxSltWeyNwkAGLCHDcD5zyxf9VI76hqOUfW+jvLZd+qNflR98u78SzMFpjA4Fgs4mE3FSr21pF3F/XcVdavSalaVCFNYRWBWrm9q13jUk5dXQbOsxqkP1tzMwumkqjNkTswR4ITatiL7lPL28A7PaPQK0bq+hS0a5bu8mMtyarc/M/lp7+7f1FE5/UOXz+QM/Kv+c9tDTafC00k/JaR8kdZ3npNV6tWlUlxSZerW0p0IcFNYL4vnNdWM2CxeSumVT865nH0f4TGAtxyRsVJcTY2/q0H1mpPK6HFPjeqPWV31HecFJUl4p6/0rvfUSnm26rK5DT+jmDdzJykvywPksNHefvH0Vt5i+OUKS/M9PMReQx8qFW5f5I4LnfsukshtCG0JbQOFCAEpSNwA2AVKpYFcbbeLPtD4CAQQdx30ByW635b7ze7y3XEfqrI/RVMawbOsxeKT5F1H6ish+XGjn2X3mmVW32cWEH4DX2KxaW9nycuGLe5N9COldP6H0tgEp/LMe208AAZKx5jxt/EXdXqq1UbWnT8KOa3WZV6/jk2t2pdBva2DRFAKAr/newXNFBwC5YmMLJ6gSUH9uo3NVjS5mif9NywucN8X3lEVXi9l1cvdf6XxWhsfHyuRajyY/mte7m63SlLiik8CApViki2yp2zvKcKKUng0UvNsqr1bqTpxbTweOzVvPmU574NoFOLx8iavaAt20du/p4l/dpUzaC8Kb+AoemKr+5KMebS+74mmwfOXPzdU49rINx42JkOeQ8y0kkgu+FCy4s38K7XsBWClmc5VFxYKLN259PUoUJODk6iWOL5Naw5jC535QydVxsekny8fGBUno8x88R+4lNY81qY1FH6V1mb03Q4bdz+uXwX4mt5S4j8x1xEWpPEzjkLlr7FJHA395d/RWLLqfFWX9Ok2c9r+XayW2fy9rOgn5EeO0p2Q6hlpPtOOKCUjvJsKsrkksWc/jByeCWLKq5saz0blsCvFRJnvmRbdQ7HXHSVtIWg2Vxu+zYoKh4Sah8wuqU4cKeMuQtWRZdc0qvmSjwwwweOvo5yogpxKkrbUUOoIW2sb0qSbpUO4ioUt2Ceh6jpzRuoW9Q6bhZRNg66jhkoHyXkeFxP6w9VWy2reZTUjmWYWjt60qexaubYR/nSx5mhX1f0MiO5/aBP8qtbNFjRfOiQ9Oywulyxl1HP7/wC4c+qfiqtvUX+OtHV+H/8A1EH/ANu1+wKuNLwrmOU3H3JfqfWZdezCKAUAoCueeo/0lFPVOa/u3Ki82+0v1Fi9M/3D/Q+tFHVAF4OiOUoty+xPal0/2y6s2XfYj7bTnmff3c/d1Il9bpEEH5l8vG9SRPf4AS3nIqbNE7Evtjb5Kz+wroPYaj76y81Yx8a+PITmTZs7aXBP7Uvg967SgXGnEOLZeQpp5pRQ60sFK0LQdqSN4Uk1XGtjL6mmsVpTMnI5TJZOSJWRlOTJCUJaS66eJQQnckf9tp2nbXqdSU3jJ4sx0aMKUeGCUVr0GdpPS87U2aaxkW6G9i5skDYyzfar6ytyB19grJb27qz4V7+QwX17G2pOctexb33bzpfG4+HjYEeBDbDUWMhLTLY6EpFvX11a4QUUorUjmtarKpNzk8ZSeJkV6MZTPPqeV5PEY4bmWnZKh2rUG0/AlVQWbz+aMfeXL0vSwhOe9pdpVqkLWPLR+8cIQj6yjwj4TURgWhNLSzq7EwUQMXDgoACYrLbIt9BIT+irjThwxS3I5VXqeZUlL6m2ZVezEU5zo0Z5D/8AmiC3+C6Ut5VCRsSrYlt/Z1+yr0GoPM7XB+Yvf3lx9O5jxLyJPSvD2x7V7yq1EJBUo2A2k91Q5aUX7yk0gcJgPfpbfDk8oEuugjxNs2u016jxK7T2VZMutvLhi/FIoWfX/n1eCL+SGjne1krz8ITsHkIRF/eYzrQHapBArcrQ4oNb0RNrU4KsZbpJ/E5Va4vLTxe1YcXf01T0dUlrLE5Hzgxq6TFJ2TIarD6TKwofAo1J5VPCq1vRXvUtLit1L6ZdaJhzs1B7lpxvENKtIyy+BwDeI7dlOfrHhT6a3s0rcNPhWuXUQ/pu046zqPVT63q7ykosWTMlMQ4qeOTKcSywnrWs2Hq3moCMXJpLWy7TnGEXKXhisWdAOao0ZoTFxMFIl2fhsIAitIU48oG93CANnGq5uTVkdelbxUG9SKArK5vpyqqOiT1vQub3EPzPPiUvibwuMDY2gSJqrnsIabPxrrRq5s/yR6SXt/TEVpqzx5I977irXpBkvvSFFJcecU45wAJTxrJUqyRu2ndUQ5YvEtMYcKS3IsTkhnvc8/Jw7qrM5JvzWR/HZG0fab/ZqTyqtwzcPq60V31Ja8dFVFrg8HzP8estvU+o4GncM/lJpuhoWaaBsp1xWxDae1R/21NV68aUHJlSsrSdxUVOO34Lec0ZnMTctkpOVyK+KTJVxuH5KEj2UJ+igbBVVq1HOTlLWzpdvbxpQVOHhXtj7y2OXHK6KcK/P1AxxScowppmMseKOw4Pa2+y6rff5O7rqYsrBcDlNaZLoXeVTN87l5qhReiDxb+pr/pXxKrz2EmYLMysTL2vRVWS5uDjatrbg+sn4b1EVqTpzcXsLRa3Ma9NVI6pfB7UWVyS1cQpzS8tewBT+LJPRvdZHd7afTUrldz/ANt+7uK36ksNVePNLsfZ0FvVNFRFAVPl1f5H5otZY+DBajHly1fJQ8SOInuXZfcVVDVP/HuOL8k9Za6C/nWLp/8Ado6uVe2j3ItdSULQUqAUhQspJ2gg9BqZKqm0znTmLol3S+YPkpJw0xRVAc6GzvUwo9afk9ae41WL21dKWjwvV3HRMpzJXVPT9yPi5f6u/lNlyVywh6wXCWbN5KOpsbbDzGT5ifu8VZcrqcNXD6ka3qOhx2/F9Evg9HcafmUf9e5r+tR/corBffel7bDcyf8AtKfM+tkg5FuhOrJzZP7yCbD6jqf51bOUv9x/p7SP9TRxt4vdPsZeVWAo4oDW53UeEwMT3rKy0RWz7AUbrWepCBdSj3CsVWvCmsZPA2bazq15cNOPE/bWyntX85MvkwuJgkrxkE7DKNvelj6Nrhod11doqEuczlPRD5V8fwLfYenqdL5qvzy3flXf1Fd9JO0lRKlKJJJJ3kk7STUYWIUBnYPCZHOZVjF49HFJfO1Z9htse06v6KfhOyslKlKpJRjrZgubmFCm6k/CvjyI6UwuIxemdPtQmSG4cForefXsJsCpx1Z6ybk1aaVONKGC1I5vc16lzWcnplJ6upIhHLhp7UuqctrqUgiOomFhkK6GkbFKHo2d5VWhZJ1akqz1aok1m8lbUIWsdfinz+3YWZUqVoUAoDlrUsb3bUuXj/0U2QPQXCR8dVCvHCpJcrOo2c+KhB74R6j86cQlzUuHZJH4k6MkA9P4qTSgsakV/Uj7dvCjN/0S6jqerectFAKAUBFuaMb3jQOZSBdTbPnJ72lpc/k1p38caMuYlMknw3dPnw6dBzel1pRslQUroSk3PqFVfE6Pws2cHTeo8htg4mXIB+UllaU/rLCU/DWWFCpLVFv3GtVvKNPxTiveSTH8ntdSykux2ILavlSHgVD7DQc+OtqGW1pa0kRtX1Baw1Ny5l34EpxXIZpK23Mrl1rKFBRaiNhsXSbjxrKz8FblPKPql0EXX9UPSqcP9zx+CwK51jkvzLVuXmhXEhyUtDZ+gz+En4EVF3M+KrJ8pYsvo+Xbwj/Svjp7SyuRmHIxGVyhPAuY6IrDo9pKGU+Ii/01n1VK5TS+WUt+grfqa4/chT+lYv3/AIIgsvSPMPM5eTElR5mTkRnVMrlSVEMHgOxSVOFLdiLHwCo+dtXnJppyw6Cdp39nRpqUXGCkscFr+GnpJRheROSd4XM1kURkbCY8RPmL7QXFgJHoSa26WUyfjeHMRdz6ngtFKLlyy0fBd5CtZ6ad03qKTjFFSo4AdhOq3rYX7JJsLqSQUq7q0Lqh5U3HZs5iay68VzRU9up8/tpJjyP1H7rlpOBeVZmeDIiA7g82LOJH10bfs1vZVXwk4PbpXOQ/qW04qaqrXHQ+Z6uh9ZP+a7YXy+zGy5Q2hY+y6g/oqRzBfsSIDI3hdw5+xnOL/wC4c+qr4qrD1HRo60dW4NXFhMerrjMn+zFXCl4FzI5Vcr92X6n1mbWQwCgFAKArvnmP9GsKsTwzmSbC+9KxUZm32l+pFh9M/wBy/wBD7CivNb+cKr2JeuFnRnKe3/T3DEdLbh9by6s+X/Yj7bTnWe/3lTnXUiW1ukSKArjmly3/ADhtebw7Y/OGk/4hhOz3ptI3f1qR7J6d3VUXf2PH88fF1/iWPJM48l+VUf7b1P6X3b+kqTTOmMxqTI+44xq5SR71IcBDTA6S59LqRvNQ1ChKrLCP+hbby9p20OKb5ltfN36jojSWksXpjFJgQQVLUeOVKXbzHnLWKlW+AbgKs1vbxpRwRzy/v53NTjl7lsSN1Wc0hQFA83IuYf1nMlKgSvcm22WI8jyVqbUEp4lFKgCLcSzVczGMnVbweHMX7IZ0420Y8UeJttrFYmi0Fj05TWuIhbFBL4feQd/AwPMNx3pFa9pDjqxXL1G9mlXyracuTBe/QdN1azmYoDylxI0yK7FlNpejvoU280raFJULEGvMoqSwepnunUlCSlF4NFM4LlNKZ1+uHNQp3A4/hmNSFDwvoKvwWSbbVJUnx9g+lUHSy5qtg/AtPPu/EuV1nsXacUdFWfy4bt77ufkLrqeKUKA5V1FFRjdQZSCpQSI0t5AubeHjKk/dIqn1o8M5Lc2dUtJupRhLfFdRu+VzklOucU/GZceb41tvONoUtCUONqSSpQFgL231sWDfnRaNHOlF2s1JpPZ7mZvMxWezOsZjycdMVEi2iQyI7pSUN7VrSQnctZPotXu+451W8HgtC0Mw5MqVG2iuKPFL5n8y29yNtyd0hPXqJzL5GG9HYx7dowfbU3xvOgp4khYF+BF9vbWfLbZ8fFJYcPWanqC/gqKpwkm5vTg8dC72T/XvL2HqxuKvz/cp0VVky0oCyWVe22pN03607dhqRu7NVsNODRAZXm0rRtYcUZbOXeYGH5L6Og8K5iHco8N5kqs3f+qRwp9d6x0sspR1/NzmxceormeiOEFya+lmi5y6LjNYyJmsVFSymDaPKYjoAHkrPgWEIHyF7O41r5napRU4rVoZvensxk5ypVHjxaU29u3pXUQPTGndZnKwcjisRJWuK+h5t1xBZb8J8QKneAWKbio6hRq8SlGL0Mnr27tvLlCpOPzJre/gb/nI/qaRneLIQnY2EieDHue2yoqHjdWtN0pWrcAq1h31s5m6jn8ywgtRH+no0I0vkknVl4t/NzH75S6C/OJiM9kW74mIv/CNKGyQ+k+1bpbbPrV3V9y6043xy8K1crPmfZp5MfKg/wByWv8ApXe/gi86sBRiuecukTk8QnORG+Kdi0nzkpFy5FO1Y72z4x6ai8ztuOPGtceosXp6/wDLqeVJ/LPVyS/HV0FM4X81Vl4Zwra38s24l2G20OJXEk3BPQEdCidlqg6XFxLg8Wwudx5fly814U8MHj7a9x1RFW+uMyuQ2GpCkJLzQPEErI8SQrpsemrfFvDTrOWTSUmk8UelfTyaTWelompsBIxb9krUOOM8Rfy3k+wru6D2XrXubdVYOLN7Lr2VtWVRe9b0Rflbq2WsO6Rz34OexN22ws7XmUbrE+0pAt3psrrrUsLh/an44/Ek87sIrC4paaVT4P8AH4PQTXNYXG5rGvY3Ish6K+LKSdhBG5ST8lSTtBrfq0o1I8MtRC21zOjNTg8JIoTUOlc3oHPRMoQqTjYshD0XIJGwhKtrbwHsLKLjqV0dVV2tbzt5qWuKevvL5aX1K/pSp6pyjg49q3rqMbmSpteuMo62oLaeLLraxuKXI7agfUa8X33pPm6jLk6atYJ61iuiTMzlHLEbX0IKVwpktPsd5KONI9bde8ulhWXLiYc+p8VpLkafZ2l4Z7VmncC1x5Wc3HURdDN+J1X1W03WfVVgrXEKa+Z4FItbGtXeFOLfLs6dRVupeeGRkcTGno3ubR2e+yQFuntQ0LoT9onuqIr5rJ6ILDlZaLP01COms+J7lq6e4raZMmTpSpc6Q5LlL9p95RWsjqudw7BsqKlJyeLeLLJTpxhHhilGO5HjXw9igM/B4LLZ3IJx+KYL8g2K1bm2kn5bq/kp+E9FZKVGVSXDFYswXN1ToQ46jwXxfIjoPQ+hsdpXHlpo+fkH7GbNIspZG5KR8lCehP6astraRox0aZbWc+zLM53U8XogtS9tpGOYGYmamzLegcCva4QvOzEbUsspIJbJ3X3cQ67J6TWpeVHVn5MP+J7iUyq3jbU3d1f+Bb3v9uVlg4nFwsVjY2OhI8uLFQG2kdNh0nrJ3mpKnTUIqK1Ir1evKrNzlplJmXXsxCgFARmdy10ROnvz5eLQ9Kkr8x9alu2UsixPCFBPR1VqTsaUpOTjpZJ084uoQUIzwjHVoXcZuM0ZpPGOJcgYmKw6ghSHUtJKwR0hRBUD6ayQtacNUUYK2Y3FVYTnJrnNzWc0xQCgFAfh5ll9lbLyEusuJKHG1gKSpJFiCDsINfGk1gz1GTi8VoaPCLicXEt7pDYj23eU2hH7IFeY04x1JI9zr1J+KTfOzKr2YhQAi4tQEAe5IaKcUpSTMaKiVHhkE7Sbn2wqo15VSe/pJ+PqS5X0v/hJdp3AQMBh4+Kg8ZjRwrhU4QpaipRUVKICbkk9VbtGiqcVFakRN3dTr1HUnrZsaymsKAjGtdAYvVnuapTzkZ2GpXC8yE8akLHiQSoK2XANal1ZxrYY6MCTy7NZ2vFwpSUt/WeOA5W6PwkpqZHjLkTWFcbMmS4pxSFWtdI8KAdvza+UbClTeKWnlPd1ndzWi4t4RetJYfiSHMYmFl8ZJxk1JXEloLbyUqKTwnqUNorZqU1OLi9TI+3rypTU4+KJX03kLp14KTFyMyMlQI4VFt0C/wBZIPw1GSyim9TZYKfqisvFGL6V2li46IIWPjQwsuCM0hkOEWKvLSE3IHXapSEeGKW4rtWpxzct7bMivRjFAKAUAIBFiLg9BoDx9yhk3LDd+vgT/srzwrce/MlvZ6pSlKQlICUjcBsFejy3ifaHwUAoDyjxIsfzPd2UM+ctTrvAkJ4nFe0tVt6j0mviilqPc6kpYYvHDR7j1r6eBQCgFAeIgwhJEkR2xJAID/Anjsd44rX2154FjjhpPfmS4eHF8O49q9HgUAoBQCgFAa5enNPrlOS3MZFXKePE6+pltS1Kta5URfcKxOhDHHhWPMbCvKyioqcuFbMWZ7bTTSAhpCUIG5KQAB6BWRLAwOTbxZ+q+nwUAoBQCgFAfHG0OIUhxIWhQspKhcEHeCDRrE+ptPFH4jxo8ZhEeM0hlhscLbTaQlCQOgJFgK+RiksEfZzcnjJ4tnpX08hSUqSUqAKSLEHaCDQJmuw2ncFhGVNYmCzDQs3X5SQCok38SvaPpNYqVGFNYRWBsXF3VrPGpJy5zY1lNcUAoCE8w9AuZsM5nDOe6alx9lxX0ng80I2htSugj5Kj3HYa0Ly08z5oaKiJvKc0VHGnVXFRnrW7l7+8+6B5iNZwqxGWR7hqWJdEmI4ODzCj2lNg9PzkdHaNtLS98z5ZaKi2HzNMpdD9yn81GWp7ufv7SYyI0eSw5HkNIeYdSUuNOJCkKSd4Uk7CK3pRTWD1EPCbi04vBorDV/JZMpz3vT0kMrShLYx8klTXC2LJS25tWiw2AK4h3VE3OV46YP3Ms9h6i4Vw1lj/AFLXp3rU/gVjkcFqnTktD0yHJx77KrszEAlAUBbiQ83xJ3HrqJnSqUni048v4lmpXNC4jhGUZp7O9M1HmB5xTxcLrqzdbqlFalHtUSSawY46TbwwWGGCPtfQCQBcmwr4D3x8CfkngzjYr010/IjoU56yPCPSa9QhKTwisTxVqwprGbUVy6Cw9NcksxMUh/PvjHxt5iskOSFDqK9rbfo4jUnQyuUtM3wr4levPUlOGiiuOW96F3v4Fu4PT+HwUFMLFRkRmBtUE7VLV85ajdSldpNTVKjGmsIrBFRubqpXlxVHi/bUQ/W2vZip3+VdIp981FIuh55Fi3ET8pSlbuJP3enbYHSurt4+XS0zfwJfLcrjw/yLj5aK2bZfh1/E3ehdEw9LYsspX7zkZJ8zITlX4nXN+wnbwi5t6ztNbFpaqjHDXJ62aWZ5lK6njqhHwx3IktbRGigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFARLW3LrF6lCZbazAzbFjGyTOxQKdqQ5YgqA6De46DWldWUaunVNbSWy3N6lt8r+ek9cX2e2DI3B5g6l0k+3i9eQ1rj34I2djp40LA2DjsBxHuAV1p6a1YXlSi+GstH1IkquVULtOpaS07YPs9sOUsXFZnFZaKmXjJbUuOr/eNKCrdihvB7DUpTqxmsYvFFdr29SlLhnFxfKZhAUCCLg7CDur2YTSZDQ+j8gril4eI4s71+UlKv1kgGtedrSlrijepZlcU/DOS95rjyo5fE3/J2x2Bx4D1BdYv8fQ+nrNj/ADl39b6F3GTE5c6GiLC2cJF4xuK0eZ/ecVe42VGOqKMVTN7qawdSXV1G/Yjx47YajtIZaG5DaQlI9AtWyopajQlNyeLeLMHO6lwWCimTlprcVu10hZ8auxCBdSvQKx1a8Kaxk8DPbWdWvLhpxcvbeQB7UutNeqMTSzK8Lp9R4X83IBS64npDIH8k361JqNdercaKa4YfU+wn42dtYfNXfmVdkFqXP+PQyZ6R0VhNLQfdsc3xPOWMqY5YvOq61K6upI2Ct+2tYUVhHpIa/wAxq3U+Kb0bFsRvq2DQFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoDylRIsuOuPKZQ/HcFnGnEhaFDqKTcGvkoqSwelHuFSUHjF4NEByXJzGIlGfpjISNPzt48hSlMnZu4bhQHZxW7KjZ5ZHHiptwZPUfUE3HgrxjVjy6zHD/O3BgpcYhaijIAAWkhp4j+y2+g15xu6exTRk4csr6nOi+ldp+/8AqtqGIAMpozIsr+UpoFxPougfHX3/ACE14qcj5/g6M/t14Pn0do/61RzsTpzLFfzfJ/76f5RfRLoH/rj/AP1p9J9PM/VsxNsToqctR9lyQS2j0+H9NP59SXhpy958/wALbw+5cQ92ntPyqLzqzt0vSIWm4qwLhn8V+3Ybr2/aFfOG7qa2oL4n1TyyhqU60uXQuztNhheUOnIkr3/LuPZ7Jk8SpE5RWm973DZJH6xVWWlltOL4pfPLlNe5z+tOPBTSpQ3R7+7AnCEJQkIQAlCQAlIFgANwAqQIRvE+0PgoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAf//Z",
    buttonDisabledSrc:
      "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGOTNDRkRBRDlFQjExRTNCODI2OTVDQ0I1QjQ3QTUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGOTNDRkRCRDlFQjExRTNCODI2OTVDQ0I1QjQ3QTUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEY5M0NGRDhEOUVCMTFFM0I4MjY5NUNDQjVCNDdBNTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEY5M0NGRDlEOUVCMTFFM0I4MjY5NUNDQjVCNDdBNTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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",
    buttonSrc:
      "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ0MkY2NjRBRDlFQjExRTNBNzU1REY3NjZERUJEODBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ0MkY2NjRCRDlFQjExRTNBNzU1REY3NjZERUJEODBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDQyRjY2NDhEOUVCMTFFM0E3NTVERjc2NkRFQkQ4MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDQyRjY2NDlEOUVCMTFFM0E3NTVERjc2NkRFQkQ4MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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",
    html5LogoSrc:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABkCAMAAABO18UcAAACwVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////kTSb////xZSnr6+vkSybs///yZyniPxT+9/XlVjHwYinkRx/iSSXvSwTkSyTzaCnr7e7kRRz+/v3r6urkSSHjMgTfLQDxYSPwXh/niXH2oHvkQhjkTyjkQxr+5933m3XqysHxYCHs/f/uXijhOQ3iQhngNAjwWhniQBbgMAPs+v3sWyjjPBLhOxHwUxDjMwXqVyfhNgvjNgnq0sznYT7fKwDq29fnhWv0aSngMgXuRwHxZCfoVCfgLwH+8Oz85NzpcFHlUizlTybwXB3jOQ7jMALs+//85+H94NLnUSbwTwrwTAbjLgDs9ffoa0vmWTXfJwDr8PH+8u/63tfyqJXthWrsf2PmXDjs9/rr8/X+9fL618z3xrnuj3breVvnaEfyaS7xYynwVxb/+/nr5+f96+X62dH40sj1va/1uKjptaj0s6Pon4zxn4rwmoTuinDoZEPnXjvr///r3tv83tD4z8T7z7z2wrTzr574tJbxo4/vlH3ngWbmel7qdVfr8vTr7u/97ujq1M73zMDpv7Tpu7DzrZvoo5H4qonomYX1j2TrfGD1i1381MLpycH3yb7qxLr6w6z5vaP4sJD3pYHolH73on3njXb2mXPzeEPyczzybTTvXiPfGgDr4d/q2NLqz8jqzsX6u5/orJ32lmz1k2j0glHzgU7zfkzze0jkQBbr5OL84db3yr76ybT6xrDor6D0hlfuQgDeLWjTAAAAOHRSTlMA8xBlBfj2w5haVjHvs6BBLCgHzMfAk2A0FOvRr4V4Rzod6ePeu6SPiIJ7ak4M5baKfyTc2HUcjEFv/7UAAAl1SURBVGjetZmHWtNgFIZTFMS99957r/xqWiA2tBARtVULbaFYqlSqDGXIUkBEUVFx77333nvvvffWq7AkJD0hqTQ+9buAviHhf/OdE8wZ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",
  };
(AudioPlayer.prototype.createNewAudio = function () {
  if (AudioMixer.isWebAudioSupport()) {
    this.gainNode = AudioMixer.waContext.createGainNode
      ? AudioMixer.waContext.createGainNode()
      : AudioMixer.waContext.createGain();
    var e = AudioMixer.waContext.createBufferSource();
    return (
      e.connect(this.gainNode),
      this.gainNode.connect(AudioMixer.waContext.destination),
      e
    );
  }
  return document.createElement("audio");
}),
  (AudioPlayer.prototype.isMp3Support = function () {
    return "" != document.createElement("audio").canPlayType("audio/mpeg");
  }),
  (AudioPlayer.prototype.init = function (e) {
    return (
      (this.basePath = e ? e : ""),
      (this.delayPlay = "ontouchstart" in window),
      (this.audioWrapper = this.createNewAudio()),
      (this.mp3Support = this.isMp3Support()),
      !0
    );
  }),
  (AudioPlayer.prototype.play = function (e, t) {
    if (this.disabled) return !1;
    var s = this.basePath + "/" + e + (this.mp3Support ? ".mp3" : ".ogg");
    if (
      (this.stop(),
      (this.audioWrapper = this.createNewAudio()),
      (this.audioWrapper.doLoop = !!t),
      (this.audioWrapper.fileName = e),
      AudioMixer.isWebAudioSupport())
    ) {
      var i = this;
      this.loadSound(s, function (e) {
        i.audioWrapper.buffer ||
          ((i.audioWrapper.buffer = e),
          i.audioWrapper.noteOn
            ? i.audioWrapper.noteOn(0)
            : i.audioWrapper.start(0),
          (i.startPlayTime = new Date().getTime()),
          (i.audioWrapper.loop = t),
          "undefined" != typeof i.audioWrapper.playbackState
            ? (i.waCheckInterval = setInterval(function () {
                return i.audioWrapper
                  ? void (
                      i.audioWrapper.playbackState ==
                        i.audioWrapper.FINISHED_STATE && i.controlPlay()
                    )
                  : void clearInterval(i.waCheckInterval);
              }, 100))
            : (i.audioWrapper.onended = i.controlPlay));
      });
    } else
      (this.audioWrapper.src = s),
        (this.audioWrapper.type = this.mp3Support ? "audio/mpeg" : "audio/ogg"),
        (this.audioWrapper.loop = !1),
        (this.audioWrapper.preload = "auto"),
        this.audioWrapper.load(),
        this.delayPlay
          ? (this.audioWrapper.addEventListener("canplay", this.readyToPlay),
            this.audioWrapper.addEventListener(
              "canplaythrough",
              this.readyToPlay
            ))
          : this.audioWrapper.play(),
        this.audioWrapper.addEventListener("ended", this.controlPlay, !1);
    (this.busy = !0), (this.startPlayTime = new Date().getTime());
  }),
  (AudioPlayer.prototype.loadSound = function (e, t) {
    if (AudioMixer.buffer[e]) return void (t && t(AudioMixer.buffer[e]));
    var s = null;
    (s = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP")),
      s.open("GET", e, !0),
      (s.responseType = "arraybuffer"),
      (s.onreadystatechange = function () {
        4 != this.readyState ||
          (200 != this.status && 0 != this.status) ||
          AudioMixer.waContext.decodeAudioData(this.response, function (s) {
            (AudioMixer.buffer[e] = s), t && t(s);
          });
      }),
      s.send();
  }),
  (AudioPlayer.prototype.readyToPlay = function (e) {
    e.currentTarget.alreadyLoaded ||
      ((e.currentTarget.alreadyLoaded = !0), e.currentTarget.play());
  }),
  (AudioPlayer.prototype.stop = function () {
    if (this.busy && ((this.busy = !1), this.audioWrapper)) {
      try {
        AudioMixer.isWebAudioSupport()
          ? this.audioWrapper.noteOff
            ? this.audioWrapper.noteOff(0)
            : this.audioWrapper.stop(0)
          : ((this.audioWrapper.currentTime = 0),
            this.audioWrapper.pause(),
            this.audioWrapper.removeEventListener("canplay", this.readyToPlay),
            this.audioWrapper.removeEventListener(
              "canplaythrough",
              this.readyToPlay
            ));
      } catch (e) {}
      this.audioWrapper = null;
    }
  }),
  (AudioPlayer.prototype.pause = function () {
    AudioMixer.isWebAudioSupport()
      ? this.audioWrapper && this.audioWrapper.disconnect()
      : this.audioWrapper.pause();
  }),
  (AudioPlayer.prototype.resume = function () {
    if (AudioMixer.isWebAudioSupport()) {
      if (this.audioWrapper)
        try {
          this.audioWrapper.connect(this.gainNode);
        } catch (e) {}
    } else this.audioWrapper.play();
  }),
  (AudioPlayer.prototype.controlPlay = function () {
    this.audioWrapper &&
      (this.audioWrapper.doLoop
        ? AudioMixer.isWebAudioSupport() ||
          (Utils.isFirefox()
            ? this.play(this.audioWrapper.fileName, !0)
            : ((this.audioWrapper.currentTime = 0), this.audioWrapper.play()))
        : ((this.busy = !1),
          "function" == typeof this.onend && this.onend(),
          this.waCheckInterval && clearInterval(this.waCheckInterval)));
  }),
  (AudioPlayer.prototype.getPosition = function () {
    if (AudioMixer.isWebAudioSupport()) {
      if (!this.startPlayTime) return 0;
      var e = this.getDuration();
      if (!e) return 0;
      var t = (new Date().getTime() - this.startPlayTime) / 1e3;
      return e >= t
        ? t
        : this.audioWrapper.doLoop
        ? t - Math.floor(t / e) * e
        : e;
    }
    return this.audioWrapper.currentTime ? this.audioWrapper.currentTime : 0;
  }),
  (AudioPlayer.prototype.getDuration = function () {
    return AudioMixer.isWebAudioSupport()
      ? this.audioWrapper.buffer
        ? this.audioWrapper.buffer.duration
        : 0
      : this.audioWrapper.duration
      ? this.audioWrapper.duration
      : 0;
  }),
  (AudioPlayer.prototype.setVolume = function (e) {
    (this.volume = e),
      this.volume < 0 && (this.volume = 0),
      this.volume > 1 && (this.volume = 1),
      AudioMixer.isWebAudioSupport()
        ? (this.gainNode.gain.value = this.volume)
        : (this.audioWrapper.volume = this.volume);
  }),
  (AudioPlayer.prototype.getVolume = function () {
    return this.volume;
  }),
  (AudioMixer.prototype.init = function (e, t) {
    if (AudioMixer.isWebAudioSupport()) {
      AudioMixer.waContext = new window.AudioContext();
      var s = AudioMixer.waContext.createBuffer(1, 1, 22050),
        i = AudioMixer.waContext.createBufferSource();
      (i.buffer = s),
        i.connect(AudioMixer.waContext.destination),
        i.noteOn ? i.noteOn(0) : i.start(0);
    }
    AudioMixer.isWebAudioSupport() ||
      -1 == navigator.userAgent.toLowerCase().indexOf("mac") ||
      ((this.singleChannelMode = !0), (t = 1)),
      (this.path = e),
      (this.channels = []);
    for (var a = 0; t > a; a++)
      (this.channels[a] = new AudioPlayer()), this.channels[a].init(e);
    Utils.addEventListener("hidewindow", Utils.proxy(this.pauseOnHide, this)),
      Utils.addEventListener(
        "showwindow",
        Utils.proxy(this.resumeOnShow, this)
      );
  }),
  (AudioMixer.prototype.pauseOnHide = function () {
    if (AudioMixer.AUTO_PAUSE_ON_TAB_HIDE)
      for (var e = 0; e < this.channels.length; e++) this.channels[e].pause();
  }),
  (AudioMixer.prototype.resumeOnShow = function () {
    if (AudioMixer.AUTO_PAUSE_ON_TAB_HIDE)
      for (var e = 0; e < this.channels.length; e++) this.channels[e].resume();
  }),
  (AudioMixer.prototype.play = function (e, t, s, i) {
    var a = -1;
    return (
      (a = "number" == typeof i ? i : this.getFreeChannel(s)),
      a >= 0 &&
        a < this.channels.length &&
        (this.channels[a].stop(), this.channels[a].play(e, t)),
      this.channels[a]
    );
  }),
  (AudioMixer.prototype.stop = function (e) {
    e >= 0 && e < this.channels.length && this.channels[e].stop();
  }),
  (AudioMixer.prototype.getFreeChannel = function (e) {
    for (
      var t = -1, s = [], i = -1, a = -1, r = 0, o = 0;
      o < this.channels.length;
      o++
    )
      this.channels[o].locked ||
        (this.channels[o].busy
          ? ((r = new Date().getTime()),
            (r -= this.channels[o].startPlayTime),
            r > a && ((a = r), (i = o)))
          : s.push(o));
    return 0 == s.length ? !e && i >= 0 && (t = i) : (t = s[0]), t;
  }),
  (AudioMixer.isWebAudioSupport = function () {
    return Boolean(window.AudioContext);
  }),
  (window.AudioContext = window.AudioContext || window.webkitAudioContext),
  (AudioMixer.buffer = {}),
  (AudioMixer.waContext = null),
  (AudioMixer.AUTO_PAUSE_ON_TAB_HIDE = !0),
  Utils.extend(TilesSprite, Sprite),
  (TilesSprite.prototype.currentFrameX = 0),
  (TilesSprite.create = function (e, t) {
    if ("string" == typeof e) {
      if (((t = t || window.library), !t))
        throw new Error(
          "Could not create sprite from asset '%s'. Library not found.",
          e
        );
      e = t.getAsset(e);
    }
    return new TilesSprite(
      e.bitmap,
      e.width || 1,
      e.height || 1,
      e.framesCount || (e.frames || 1) * (e.layers || 1),
      e.frames || 1,
      e.layers || 1
    );
  }),
  (TilesSprite.prototype.gotoAndStop = function (e) {
    (this.currentFrameX = e), this.stop();
  }),
  (TilesSprite.prototype.gotoAndPlay = function (e, t) {
    (this.currentFrameX = e), this.play(t);
  }),
  (TilesSprite.prototype.dispatchEvent = function (e, t) {
    if ("animend" == e) {
      if (!t.fromTileSprite) return;
      delete t.fromTileSprite;
    }
    return EventsManager.dispatchEvent(this, e, t);
  }),
  (TilesSprite.changeStep = function (e) {
    var t = e.target;
    t.animated &&
      ((t.currentFrameX += t.animDirection),
      t.animDirection > 0 &&
        t.currentFrameX >= t.framesCount &&
        ((t.currentFrameX = 0),
        t.hasEventListener("animend") &&
          t.dispatchEvent("animend", {
            target: t,
            delta: e.delta,
            fromTileSprite: !0,
          })),
      t.animDirection < 0 &&
        t.currentFrameX < 0 &&
        ((t.currentFrameX = t.framesCount - 1),
        t.hasEventListener("animend") &&
          t.dispatchEvent("animend", {
            target: t,
            delta: e.delta,
            fromTileSprite: !0,
          })));
  }),
  (TilesSprite.sync = function (e) {
    var t = e.target;
    (t.currentLayer = Math.floor(t.currentFrameX / t.totalFrames)),
      (t.currentFrame = t.currentFrameX - t.currentLayer * t.totalFrames);
  }),
  (SimpleText.prototype.manageSprites = function (e) {
    var t,
      s,
      i = e.length,
      a = this.sprites.length;
    if (i > a)
      for (t = 0; i - a > t; t++)
        (s = new SimpleText.spriteClass(
          this.font,
          this.width,
          this.height,
          this.charMap.length
        )),
          this.sprites.push(s),
          this.parent.addChild(s);
    if (a > i) {
      for (t = 0; a - i > t; t++) this.parent.removeChild(this.sprites[t]);
      this.sprites.splice(0, a - i);
    }
  }),
  (SimpleText.prototype.getCharIx = function (e) {
    for (var t = 0; t < this.charMap.length; t++)
      if (this.charMap[t] == e) return t;
    return -1;
  }),
  (SimpleText.prototype.getCharWidth = function (e) {
    var t = this.getCharIx(e);
    return t >= 0 && this.charWidth[t] ? this.charWidth[t] : this.width;
  }),
  (SimpleText.prototype.getWidth = function () {
    for (var e = 0, t = 0; t < this.text.length; t++)
      e += this.getCharWidth(this.text.substr(t, 1)) + this.charSpacing;
    return e;
  }),
  (SimpleText.prototype.write = function (e) {
    var t, s, i, a, r;
    (e += ""),
      (this.text = e),
      this.manageSprites(e),
      (t = this.x),
      (s = this.y),
      this.align == SimpleText.ALIGN_CENTER &&
        (t =
          this.x -
          (this.getWidth() / 2) * this.scale +
          (this.getCharWidth(this.text.substr(0, 1)) / 2) * this.scale),
      this.align == SimpleText.ALIGN_RIGHT &&
        (t = this.x - this.getWidth() * this.scale),
      (i = new Vector(t - this.x, 0)),
      i.rotate(-this.rotation),
      (t = i.x + this.x),
      (s = i.y + this.y),
      (i = new Vector(0, 0));
    for (var o = 0; o < e.length; o++)
      if (
        ((this.sprites[o].visible = !0),
        (r = this.charMap.indexOf(e.substr(o, 1))),
        0 > r)
      )
        this.sprites[o].visible = !1;
      else {
        var n = this.getCharWidth(this.text.substr(o, 1));
        (this.sprites[o].scaleX = this.sprites[o].scaleY = this.scale),
          this.sprites[o].gotoAndStop(r),
          (a = i.clone()),
          (a.x *= this.scale),
          a.rotate(-this.rotation),
          (this.sprites[o].x =
            a.x + ("," == this.text.substr(o, 1) ? t - n / 2 : t)),
          (this.sprites[o].y = a.y + s),
          (this.sprites[o].rotation = this.rotation),
          (this.sprites[o]["static"] = this["static"]),
          (this.sprites[o].opacity = this.opacity),
          (this.sprites[o].ignoreViewport = this.ignoreViewport),
          (this.sprites[o].gx = this.sprites[o].x),
          (this.sprites[o].gy = this.sprites[o].y),
          (this.sprites[o].gscaleX = this.sprites[o].scaleX),
          (this.sprites[o].gscaleY = this.sprites[o].scaleY),
          (this.sprites[o].grotation = this.sprites[o].rotation),
          (this.sprites[o].gopacity = this.sprites[o].opacity),
          (i.x += n + this.charSpacing);
      }
  }),
  (SimpleText.prototype.refresh = function () {
    this.write(this.text);
  }),
  (SimpleText.prototype.addToGroup = function (e) {
    for (var t = 0; t < this.sprites.length; t++)
      (this.sprites[t].gx = this.sprites[t].x / 2),
        (this.sprites[t].gy = this.sprites[t].y),
        e.addChild(this.sprites[t], !1);
  }),
  (SimpleText.prototype.putToGroup = function (e) {
    for (var t = 0; t < this.sprites.length; t++)
      (this.sprites[t].gx = this.sprites[t].x),
        (this.sprites[t].gy = this.sprites[t].y),
        e.addChild(this.sprites[t], !1);
  }),
  (SimpleText.prototype.refreshOnTween = function (e) {
    e.target.obj.refresh();
  }),
  (SimpleText.prototype.setPosition = function (e, t) {
    (this.x = e), (this.y = t), this.refresh();
  }),
  (SimpleText.prototype.removeTweens = function () {
    this.stage && this.stage.clearObjectTweens(this);
  }),
  (SimpleText.prototype.addTween = function (e, t, s, i, a, r) {
    if (this.stage) {
      var o = this[e];
      if (!isNaN(o)) {
        var n = this.stage.createTween(this, e, o, t, s, i);
        return (n.onchange = r), (n.onfinish = a), n;
      }
    }
  }),
  (SimpleText.prototype.moveTo = function (e, t, s, i, a, r) {
    if (((s = ~~s), 0 >= s)) this.setPosition(e, t);
    else {
      var o = this.addTween("x", e, s, i, a, r);
      o &&
        (o.addEventListener("change", this.refreshOnTween),
        o.addEventListener("finish", this.refreshOnTween),
        o.play());
      var n = this.addTween("y", t, s, i, o ? null : a, o ? null : r);
      n &&
        (n.addEventListener("change", this.refreshOnTween),
        n.addEventListener("finish", this.refreshOnTween),
        n.play());
    }
    return this;
  }),
  (SimpleText.prototype.moveBy = function (e, t, s, i, a, r) {
    return this.moveTo(this.x + e, this.y + t, s, i, a, r);
  }),
  (SimpleText.prototype.fadeTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t)) this.opacity = e;
    else {
      var r = this.addTween("opacity", e, t, s, i, a);
      r &&
        (r.play(),
        r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween));
    }
    return this;
  }),
  (SimpleText.prototype.fadeBy = function (e, t, s, i, a) {
    var r = Math.max(0, Math.min(1, this.opacity + e));
    return this.fadeTo(r, t, s, i, a);
  }),
  (SimpleText.prototype.rotateTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t)) this.rotation = e;
    else {
      var r = this.addTween("rotation", e, t, s, i, a);
      r &&
        (r.play(),
        r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween));
    }
    return this;
  }),
  (SimpleText.prototype.rotateBy = function (e, t, s, i, a) {
    return this.rotateTo(this.rotation + e, t, s, i, a);
  }),
  (SimpleText.prototype.scaleTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t)) this.scale = e;
    else {
      var r = this.addTween("scale", e, t, s, i, a);
      r &&
        (r.play(),
        r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween));
    }
    return this;
  }),
  (SimpleText.spriteClass = Sprite),
  (SimpleText.ALIGN_LEFT = 0),
  (SimpleText.ALIGN_RIGHT = 1),
  (SimpleText.ALIGN_CENTER = 2),
  (BitmapText.ALIGN_LEFT = 0),
  (BitmapText.ALIGN_RIGHT = 1),
  (BitmapText.ALIGN_CENTER = 2),
  (BitmapText.VALIGN_TOP = 0),
  (BitmapText.VALIGN_MIDDLE = 1),
  (BitmapText.VALIGN_BOTTOM = 2),
  (BitmapText.spriteClass = Sprite),
  (BitmapText.LINES_DELIMITER = "\n"),
  (BitmapText.prototype.x = 0),
  (BitmapText.prototype.y = 0),
  (BitmapText.prototype.align = BitmapText.ALIGN_LEFT),
  (BitmapText.prototype.valign = BitmapText.VALIGN_TOP),
  (BitmapText.prototype.rotation = 0),
  (BitmapText.prototype.charSpacing = 0),
  (BitmapText.prototype.lineSpacing = 0),
  (BitmapText.prototype.lineHeight = null),
  (BitmapText.prototype.maxWidth = 0),
  (BitmapText.prototype.scale = 1),
  (BitmapText.prototype.opacity = 1),
  (BitmapText.prototype["static"] = !1),
  (BitmapText.prototype.text = ""),
  (this.ignoreViewport = !1),
  (this.zIndex = void 0),
  (BitmapText.prototype.manageSprites = function (e) {
    if (this.parent) {
      var t,
        s,
        i = e.length,
        a = this.sprites.length;
      if (i > a)
        for (t = 0; i - a > t; t++)
          (s = new BitmapText.spriteClass(null, 0, 0)),
            this.sprites.push(s),
            this.parent.addChild(s);
      if (a > i) {
        for (t = 0; a - i > t; t++) this.parent.removeChild(this.sprites[t]);
        this.sprites.splice(0, a - i);
      }
    }
  }),
  (BitmapText.prototype.getChar = function (e) {
    for (var t = e.charCodeAt(0), s = 0; s < this.charMap.length; s++)
      if (this.charMap[s].id == t) return this.charMap[s];
    return (
      console.log("Char not found", e, t, this.text),
      {
        id: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        xoffset: 0,
        yoffset: 0,
        page: 0,
        xadvance: 0,
      }
    );
  }),
  (BitmapText.prototype.getWidth = function () {
    for (var e = 0, t = 0; t < this.lines.length; t++) {
      for (var s, i = 0, a = 0; a < this.lines[t].length; a++)
        (s = this.getChar(this.lines[t].substr(a, 1))),
          (i += s.xadvance + this.charSpacing);
      i > e && (e = i);
    }
    return e;
  }),
  (BitmapText.prototype.getRealWidth = function () {
    return this.getWidth() * this.scale;
  }),
  (BitmapText.prototype.getWidthOfLine = function (e) {
    for (var t, s = 0, i = 0; i < this.lines[e].length; i++)
      (t = this.getChar(this.lines[e].substr(i, 1))),
        (s += t.xadvance + this.charSpacing);
    return s;
  }),
  (BitmapText.prototype.getHeight = function () {
    for (var e = 0, t = 0; t < this.lines.length; t++)
      e += this.getHeightOfLine(t) + this.lineSpacing;
    return e;
  }),
  (BitmapText.prototype.getRealHeight = function () {
    return this.getHeight() * this.scale;
  }),
  (BitmapText.prototype.getHeightOfLine = function (e) {
    if (this.lineHeight) return this.lineHeight;
    for (var t, s = 0, i = 0; i < this.lines[e].length; i++)
      (t = this.getChar(this.lines[e].substr(i, 1))),
        t.height + t.yoffset > s && (s = t.height + t.yoffset);
    return s;
  }),
  (BitmapText.prototype.setScaleToFitContainer = function (e, t, s) {
    var i = e / this.getWidth();
    t && t > i ? (i = t) : s && i > s && (i = s), (this.scale = i);
  }),
  (BitmapText.prototype.write = function (e) {
    var t, s, i, a, r, o, n, h, l;
    if (((e += ""), this.maxWidth > 0)) {
      for (
        var p, d = e.split(BitmapText.LINES_DELIMITER), c = [], u = [], g = 0;
        g < d.length;
        g++
      ) {
        (p = d[g].split(" ")), (u = [p[0]]);
        for (var f = 1; f < p.length; f++)
          (this.lines = [u.join(" ") + " " + p[f]]),
            this.getWidthOfLine(0) > this.maxWidth
              ? (c.push(u.join(" ")), (u = [p[f]]))
              : u.push(p[f]);
        c.push(u.join(" "));
      }
      e = c.join(BitmapText.LINES_DELIMITER);
    }
    (this.text = e),
      (this.lines = e.split(BitmapText.LINES_DELIMITER)),
      this.manageSprites(e),
      (i = this.x),
      (a = this.y),
      (r = this.y),
      (h = this.getHeight()),
      this.valign == BitmapText.VALIGN_MIDDLE &&
        (r = this.y - (h / 2) * this.scale),
      this.valign == BitmapText.VALIGN_BOTTOM && (r = this.y - h * this.scale);
    for (var m = 0, y = 0, f = 0; f < this.lines.length; f++) {
      (l = this.getHeightOfLine(f)),
        this.align == BitmapText.ALIGN_CENTER &&
          (i = this.x - (this.getWidthOfLine(f) / 2) * this.scale),
        this.align == BitmapText.ALIGN_RIGHT &&
          (i = this.x - this.getWidthOfLine(f) * this.scale),
        (o = new Vector(i - this.x, r - this.y + y)),
        o.rotate(-this.rotation),
        (i = o.x + this.x),
        (a = o.y + this.y),
        (y += (l + this.lineSpacing) * this.scale),
        (o = new Vector(0, 0));
      for (var x = 0; x < this.lines[f].length; x++)
        (s = this.sprites[m]),
          m++,
          (s.visible = !0),
          (t = this.getChar(this.lines[f].substr(x, 1))),
          t
            ? ((s.bitmap = this.font[t.page ? t.page : 0]),
              (s.width = t.width),
              (s.height = t.height),
              (s.offset.left = t.x),
              (s.offset.top = t.y),
              (s.anchor.x = -t.width / 2),
              (s.anchor.y = -t.height / 2),
              (n = o.clone()),
              (n.x += t.xoffset * this.scale),
              (n.y += (t.yoffset - l / 2) * this.scale),
              n.rotate(-this.rotation),
              (s.x = n.x + i),
              (s.y = n.y + a),
              (s.scaleX = s.scaleY = this.scale),
              (s.rotation = this.rotation),
              s.setStatic(this["static"]),
              (s.ignoreViewport = this.ignoreViewport),
              (s.opacity = this.opacity),
              (s.gx = s.x),
              (s.gy = s.y),
              (s.gscaleX = s.scaleX),
              (s.gscaleY = s.scaleY),
              (s.grotation = s.rotation),
              (s.gopacity = s.opacity),
              (o.x += (t.xadvance + this.charSpacing) * this.scale),
              "number" == typeof this.zIndex &&
                s.zIndex != this.zIndex &&
                s.setZIndex(this.zIndex))
            : (s.visible = !1);
    }
  }),
  (BitmapText.prototype.setStatic = function (e) {
    (e = !!e), this["static"] != e && ((this["static"] = e), this.refresh());
  }),
  (BitmapText.prototype.setZIndex = function (e) {
    this.zIndex = e;
    for (var t = 0; t < this.sprites.length; t++) this.sprites[t].setZIndex(e);
  }),
  (BitmapText.prototype.addToGroup = function (e) {
    for (var t = 0; t < this.sprites.length; t++)
      (this.sprites[t].gx = this.sprites[t].x / 2),
        (this.sprites[t].gy = this.sprites[t].y),
        e.addChild(this.sprites[t], !1);
  }),
  (BitmapText.prototype.putToGroup = function (e) {
    for (var t = 0; t < this.sprites.length; t++)
      (this.sprites[t].gx = this.sprites[t].x),
        (this.sprites[t].gy = this.sprites[t].y),
        e.addChild(this.sprites[t], !1);
  }),
  (BitmapText.prototype.refresh = function () {
    this.write(this.text);
  }),
  (BitmapText.prototype.refreshOnTween = function (e) {
    e.target.obj.refresh();
  }),
  (BitmapText.prototype.setPosition = function (e, t) {
    (this.x = e), (this.y = t), this.refresh();
  }),
  (BitmapText.prototype.removeTweens = function () {
    var e = this.parent && this.parent.stage ? this.parent.stage : this.stage;
    e && e.clearObjectTweens(this);
  }),
  (BitmapText.prototype.addTween = function (e, t, s, i, a, r) {
    var o = this.parent && this.parent.stage ? this.parent.stage : this.stage;
    if (o) {
      var n = this[e];
      if (!isNaN(n)) {
        var h = o.createTween(this, e, n, t, s, i);
        return (h.onchange = r), (h.onfinish = a), h;
      }
    }
  }),
  (BitmapText.prototype.moveTo = function (e, t, s, i, a, r) {
    if (((s = ~~s), 0 >= s)) this.setPosition(e, t);
    else {
      var o = this.addTween("x", e, s, i, a, r);
      o &&
        (o.addEventListener("change", this.refreshOnTween),
        o.addEventListener("finish", this.refreshOnTween),
        o.play());
      var n = this.addTween("y", t, s, i, o ? null : a, o ? null : r);
      n &&
        (n.addEventListener("change", this.refreshOnTween),
        n.addEventListener("finish", this.refreshOnTween),
        n.play());
    }
    return this;
  }),
  (BitmapText.prototype.moveBy = function (e, t, s, i, a, r) {
    return this.moveTo(this.x + e, this.y + t, s, i, a, r);
  }),
  (BitmapText.prototype.fadeTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t)) this.opacity = e;
    else {
      var r = this.addTween("opacity", e, t, s, i, a);
      r &&
        (r.play(),
        r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween));
    }
    return this;
  }),
  (BitmapText.prototype.fadeBy = function (e, t, s, i, a) {
    var r = Math.max(0, Math.min(1, this.opacity + e));
    return this.fadeTo(r, t, s, i, a);
  }),
  (BitmapText.prototype.rotateTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t)) this.rotation = e;
    else {
      var r = this.addTween("rotation", e, t, s, i, a);
      r &&
        (r.play(),
        r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween));
    }
    return this;
  }),
  (BitmapText.prototype.rotateBy = function (e, t, s, i, a) {
    return this.rotateTo(this.rotation + e, t, s, i, a);
  }),
  (BitmapText.prototype.scaleTo = function (e, t, s, i, a) {
    if (((t = ~~t), 0 >= t)) this.scale = e;
    else {
      var r = this.addTween("scale", e, t, s, i, a);
      r &&
        (r.play(),
        r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween));
    }
    return this;
  });
var ACTION_NORMAL = 1,
  ACTION_FIND_EAT = 2,
  ACTION_EAT = 3,
  ACTION_DEATH = 4,
  ACTION_STARVING = 5;
Utils.extend(ProductionPet, TilesSprite),
  (ProductionPet.prototype.appearShadow = function () {
    var e = this;
    (this.isFalling = !0),
      (this.fallingShadow = addSprite(
        !1,
        this.Shadow.Picture,
        this.x,
        this.y + 320
      )),
      this.moveTo(
        this.x,
        this.fallingShadow.y,
        1e3 * this.FallingTime,
        null,
        function () {
          e.landing();
        }
      );
  }),
  (ProductionPet.prototype.landing = function () {
    playSound(this.landingSound),
      (this.isFalling = !1),
      (this.fallingShadow.destroy = !0),
      effectDust(this, 1),
      this.move();
  }),
  (ProductionPet.prototype.move = function () {
    if (10 != this.state) {
      this.action = ACTION_NORMAL;
      var e = this,
        t = random(140, 360),
        s = random(115, 190),
        i = t - this.x,
        a = s - this.y,
        r = Math.sqrt(i * i + a * a),
        o = (2 * r * 1e3) / this.Speed;
      this.chooseStateByVector(i, a),
        10 != this.state &&
          this.moveTo(t, s, o, null, function () {
            e.move();
          });
    }
  }),
  (ProductionPet.prototype.changeState = function (e) {
    var t, s;
    switch ((this.gotoAndPlay(0), e)) {
      case 2:
        (t = "States"), (s = "s3MOVE_UP_LEFT"), (this.scaleX = 1);
        break;
      case 3:
        (t = "States"), (s = "s4MOVE_LEFT"), (this.scaleX = 1);
        break;
      case 4:
        (t = "States"), (s = "s5MOVE_DOWN_LEFT"), (this.scaleX = 1);
        break;
      case 5:
        (t = "States"), (s = "s6MOVE_DOWN"), (this.scaleX = 1);
        break;
      case 6:
        (t = "States"), (s = "s5MOVE_DOWN_LEFT"), (this.scaleX = -1);
        break;
      case 7:
        (t = "States"), (s = "s4MOVE_LEFT"), (this.scaleX = -1);
        break;
      case 8:
        (t = "States"), (s = "s3MOVE_UP_LEFT"), (this.scaleX = -1);
        break;
      case 9:
        (t = "States"), (s = "s2MOVE_UP"), (this.scaleX = 1);
        break;
      case 10:
        (t = "AnimationStates"),
          (s = "s2Death"),
          (this.scaleX = 1),
          this.curSound && this.curSound.stop(),
          playSound(this.dieSound),
          (field.petsLost = !0),
          (this.onchangeframe = function (e) {
            (e.target.currentFrameX != e.target.framesCount - 1 &&
              e.target.currentFrame != e.target.totalFrames - 1) ||
              (e.target.destroy = !0);
          });
        break;
      case 11:
        (t = "AnimationStates"), (s = "s1EAT");
        var i = random(1, 2);
        (this.scaleX = 1 == i ? 1 : -1),
          (this.onchangeframe = function (e) {
            if (
              e.target.currentFrameX == Math.floor(e.target.framesCount / 2) ||
              e.target.currentFrame == Math.floor(e.target.totalFrames / 2)
            ) {
              if (field.pause) return;
              (this.life += this.OneTimeBite), (this.eatingGrass.Value -= 1);
            }
            if (
              e.target.currentFrameX == e.target.framesCount - 1 ||
              e.target.currentFrame == e.target.totalFrames - 1
            )
              if (this.life >= this.HungryValue) {
                if (field.pause) return;
                (this.life = this.HungryValue),
                  (this.action = ACTION_NORMAL),
                  (this.onchangeframe = function () {}),
                  this.move();
              } else
                (this.onchangeframe = function () {}),
                  field.grass.length > 0
                    ? ((this.action = ACTION_FIND_EAT), this.findEat())
                    : ((this.action = ACTION_STARVING), this.move());
          });
    }
    (this.bitmap = library.items[this[t][s].Picture].bitmap),
      (this.width = library.items[this[t][s].Picture].width),
      (this.height = library.items[this[t][s].Picture].height),
      (this.animDelay = this[t][s].anim_length),
      (this.layers = library.items[this[t][s].Picture].layers),
      (this.totalFrames = library.items[this[t][s].Picture].frames),
      (this.lifeLine.scaleX = this.scaleX),
      (this.state = e);
  }),
  (ProductionPet.prototype.chooseStateByVector = function (e, t) {
    -10 > e &&
      (-10 > t && this.changeState(2),
      t >= -10 && 10 >= t && this.changeState(3),
      t > 10 && this.changeState(4)),
      e >= -10 &&
        10 >= e &&
        (0 > t ? this.changeState(9) : this.changeState(5)),
      e > 10 &&
        (-10 > t && this.changeState(8),
        t >= -10 && 10 >= t && this.changeState(7),
        t > 10 && this.changeState(6));
  }),
  (ProductionPet.prototype.findEat = function () {
    if (0 == field.grass.length)
      return (this.action = ACTION_STARVING), void this.move();
    var e,
      t = this,
      s = {},
      i = 0;
    s.len = 1e3;
    for (var a = 0; a < field.grass.length; a++) {
      var r = Math.abs(this.x - field.grass[a].x),
        o = Math.abs(this.y - field.grass[a].y);
      (e = Math.sqrt(r * r + o * o)),
        s.len > e &&
          ((s.len = e),
          (s.x = field.grass[a].x),
          (s.y = field.grass[a].y),
          (i = a));
    }
    this.eatingGrass = field.grass[i];
    var n = s.x + random(-10, 10),
      h = s.y + random(-10, 10);
    this.chooseStateByVector(n - this.x, h - this.y), (this.animDelay = 0.33);
    var r = n - this.x,
      o = h - this.y,
      l = Math.sqrt(r * r + o * o),
      p = (2 * l * 1e3) / this.HungryMovingSpeed;
    50 > p && (p = 50),
      this.moveTo(n, h, p, null, function () {
        t.eatGrass();
      });
  }),
  (ProductionPet.prototype.eatGrass = function () {
    return 0 == field.grass.length
      ? (playSound(this.hungrySound),
        (this.action = ACTION_STARVING),
        void this.move())
      : (this.curSound && this.curSound.stop(),
        this.changeState(11),
        void (this.action = ACTION_EAT));
  }),
  (ProductionPet.prototype.tick = function (e) {
    if (10 != this.state) {
      if (
        (this.isFalling ||
          ("Chicken" == this.xmlName &&
            field.timeReal > 4 &&
            createHint(0, 2, this, 75, 35, !1, 5, -10, !0),
          "Cow" == this.xmlName &&
            field.timeReal > 4 &&
            field.curLevel > 0 &&
            createHint(23, 2, this, 75, 35, !1, 5, -10, !0),
          "Pig" == this.xmlName &&
            field.timeReal > 4 &&
            field.curLevel > 0 &&
            createHint(26, 2, this, 75, 35, !1, 5, -10, !0)),
        this.action != ACTION_DEATH &&
          ((this.productionTime += e),
          this.productionTime >= this.productionPeriod))
      ) {
        var t = random(750, 1250);
        (this.productionPeriod = this.prodTimeout * t),
          (this.productionTime = 0),
          field.addProduction(this.product, this.x, this.y);
      }
      this.life <= this.HungryValue * this.HungryPart &&
        this.action != ACTION_FIND_EAT &&
        this.action != ACTION_EAT &&
        this.action != ACTION_DEATH &&
        field.grass.length > 0 &&
        ((this.curSound = playSound(this.hungrySound, !0)),
        (this.action = ACTION_FIND_EAT),
        this.removeTweens(),
        this.findEat()),
        this.action != ACTION_EAT &&
          this.action != ACTION_FIND_EAT &&
          (this.life -= (this.HungrySpeed * e) / 1e3),
        this.life <= 0 && (this.changeState(10), field.removePet());
      var s =
        this.lifeLine.totalFrames -
        1 -
        Math.ceil((this.lifeLine.totalFrames * this.life) / this.HungryValue);
      0 > s && (s = 0),
        this.lifeLine.gotoAndStop(s),
        this.setZIndex(this.y + this.height / 2),
        this.lifeLine.setZIndex(this.y + this.height / 2);
    }
  });
var ACTION_NORMAL = 1,
  ACTION_MOVE_TO_BEAR = 2,
  ACTION_SCARING = 3;
Utils.extend(Animal, TilesSprite),
  (Animal.prototype.landing = function () {
    "Bear" == this.xmlName &&
      (playSound("bear_landing"),
      (this.curSound = playSound("bear" + this.up + "_scream", !0)),
      createHint(8, 8, this, 0, -70, !1, 0, -30, !0)),
      "Cat" == this.xmlName &&
        (playSound("cat_voice"),
        createHint(24, 8, this, 0, -65, !1, 0, -15, !0)),
      "Dog" == this.xmlName &&
        (playSound("dog_voice"),
        createHint(27, 8, this, 0, -65, !1, 0, -15, !0)),
      (this.isFalling = !1),
      (this.fallingShadow.destroy = !0),
      effectDust(this, 1),
      this.move();
  }),
  (Animal.prototype.changeState = function (e) {
    var t, s;
    switch ((this.gotoAndPlay(0), e)) {
      case 2:
        (t = "States"), (s = "s3MOVE_UP_LEFT"), (this.scaleX = 1);
        break;
      case 3:
        (t = "States"), (s = "s4MOVE_LEFT"), (this.scaleX = 1);
        break;
      case 4:
        (t = "States"), (s = "s5MOVE_DOWN_LEFT"), (this.scaleX = 1);
        break;
      case 5:
        (t = "States"), (s = "s6MOVE_DOWN"), (this.scaleX = 1);
        break;
      case 6:
        (t = "States"), (s = "s5MOVE_DOWN_LEFT"), (this.scaleX = -1);
        break;
      case 7:
        (t = "States"), (s = "s4MOVE_LEFT"), (this.scaleX = -1);
        break;
      case 8:
        (t = "States"), (s = "s3MOVE_UP_LEFT"), (this.scaleX = -1);
        break;
      case 9:
        (t = "States"), (s = "s2MOVE_UP"), (this.scaleX = 1);
    }
    var i = library.items[this[t][s].Picture];
    (this.bitmap = i.bitmap),
      (this.width = i.width),
      (this.height = i.height),
      (this.layers = i.layers),
      (this.totalFrames = i.frames),
      (this.state = e);
  }),
  (Animal.prototype.chooseStateByVector = function (e, t) {
    -10 > e &&
      (-10 > t && this.changeState(2),
      t >= -10 && 10 >= t && this.changeState(3),
      t > 10 && this.changeState(4)),
      e >= -10 &&
        10 >= e &&
        (0 > t ? this.changeState(9) : this.changeState(5)),
      e > 10 &&
        (-10 > t && this.changeState(8),
        t >= -10 && 10 >= t && this.changeState(7),
        t > 10 && this.changeState(6));
  }),
  (Animal.prototype.move = function () {
    if (10 != this.state) {
      this.action = ACTION_NORMAL;
      var e = random(120, 395),
        t = random(115, 190),
        s = e - this.x,
        i = t - this.y,
        a = Math.sqrt(s * s + i * i),
        r = (2 * a * 1e3) / this.Speed;
      (this.destX = e),
        (this.destY = t),
        (this.len = a),
        (this.moveTime = r),
        (this.speedX = s / this.moveTime),
        (this.speedY = i / this.moveTime),
        this.chooseStateByVector(s, i);
    }
  }),
  (Animal.prototype.tick = function (e) {
    if (!field.pause) {
      if (
        (this.setZIndex(this.y + this.height / 2),
        "Dog" == this.xmlName && field.bears.length > 0)
      ) {
        for (var t = !1, s = 0; s < field.bears.length; s++)
          field.bears[s].captured || field.bears[s].isFalling || (t = !0);
        if (t) {
          var i = !0;
          if (this.action == ACTION_NORMAL) {
            for (var a = 480, r = 0, s = 0; s < field.bears.length; s++)
              if (
                !field.bears[s].dogged &&
                !field.bears[s].captured &&
                !field.bears[s].isFalling
              ) {
                var o = field.bears[s].x - this.x,
                  n = field.bears[s].y - this.y,
                  h = Math.sqrt(o * o + n * n);
                a > h && ((a = h), (r = s)), (i = !1);
              }
            i && (r = random(0, field.bears.length - 1)),
              (this.action = ACTION_MOVE_TO_BEAR),
              (field.bears[r].targeted = !0);
          }
          if (this.action == ACTION_MOVE_TO_BEAR) {
            for (var a = 480, r = 0, s = 0; s < field.bears.length; s++)
              if (field.bears[s].targeted) {
                var o = field.bears[s].x - this.x,
                  n = field.bears[s].y - this.y,
                  h = Math.sqrt(o * o + n * n);
                a > h && ((a = h), (r = s));
              }
            var l = field.bears[r],
              p = l.x,
              d = l.y,
              o = p - this.x,
              n = d - this.y,
              h = Math.sqrt(o * o + n * n),
              c = (1e3 * h) / this.Speed;
            (this.destX = p),
              (this.destY = d),
              (this.len = h),
              (this.moveTime = c),
              (this.speedX = o / this.moveTime),
              (this.speedY = n / this.moveTime),
              (this.currentFrameX != this.totalFrames - 1 && i) ||
                this.chooseStateByVector(o, n);
          }
        }
      }
      if ("Cat" == this.xmlName) {
        var u = [];
        if (field.products.length > 0)
          for (var s = 0; s < field.products.length; s++)
            !field.products[s].isFalling &&
              !field.products[s].onDepot &&
              !field.products[s].isMoving &&
              depot.realCapacity + field.products[s].DepotSize <=
                depot.capacity &&
              u.push(s);
        if (u.length > 0 && !this.moveToProduct) {
          var g = random(0, this.prob.length - 1),
            f = this.prob[g];
          if ("stupid" == f)
            var m = random(0, u.length - 1),
              l = field.products[u[m]];
          else {
            for (var a = 480, r = 0, s = 0; s < u.length; s++) {
              var o = field.products[u[s]].x - this.x,
                n = field.products[u[s]].y - this.y,
                h = Math.sqrt(o * o + n * n);
              a > h && ((a = h), (r = s));
            }
            var l = field.products[u[r]];
            if (depot.realCapacity + l.DepotSize > depot.capacity)
              var m = random(0, u.length - 1),
                l = field.products[u[m]];
          }
          this.moveToProduct = !0;
          var p = l.x,
            d = l.y,
            o = p - this.x,
            n = d - this.y,
            h = Math.sqrt(o * o + n * n),
            c = (1e3 * h) / this.Speed;
          (this.destX = p),
            (this.destY = d),
            (this.len = h),
            (this.moveTime = c),
            (this.speedX = o / this.moveTime),
            (this.speedY = n / this.moveTime),
            this.chooseStateByVector(o, n);
        }
      }
      if ("Bear" == this.xmlName && this.cage.visible)
        if (0 != this.state) {
          this.Progress != this.ProgressMaxValue &&
            ((this.Progress -= (e * this.BrokeTime) / 1e3),
            this.Progress <= 0 &&
              ((this.Progress = 0), (this.cage.visible = !1)));
          var y =
            Math.floor(
              (this.cage.totalFrames * this.Progress) / this.ProgressMaxValue
            ) - 1;
          if (
            (0 > y && (y = 0),
            this.cage.gotoAndStop(y),
            (this.cageEffect = 1 - this.Progress / this.ProgressMaxValue),
            (this.animDelay = 1 / this.cageEffect),
            y == this.cage.totalFrames - 1)
          ) {
            this.curSound && this.curSound.stop();
            var x = library.items[this.Picture];
            (this.bitmap = x.bitmap),
              (this.width = x.width),
              (this.height = x.height),
              (this.layers = x.layers),
              (this.totalFrames = x.frames),
              (this.scaleX = 1),
              (this.state = 0),
              this.gotoAndStop(0);
            var x =
              library.items["houses/cage/cage_break" + (config.accessCage + 1)];
            (this.cage.bitmap = x.bitmap),
              (this.cage.width = x.width),
              (this.cage.height = x.height),
              (this.cage.layers = x.layers),
              (this.cage.totalFrames = x.frames),
              (this.animDelay = 1),
              (this.captured = !0),
              (this.cage.currentLayer = 0),
              this.cage.gotoAndStop(0),
              (this.onmousedown = function (e) {
                field.pause ||
                  this.isMoving ||
                  (setFirstFrame(e), (landCheck = !0));
              }),
              (this.onmouseup = this.toDepot);
          }
        } else
          (this.releaseTimePass += e / 1e3),
            this.releaseTimePass >= this.releaseTime - 3 &&
              !this.tryToEscape &&
              ((this.tryToEscape = !0),
              (this.curSound = playSound("cage_breaking", !0)),
              this.play(),
              this.cage.play()),
            this.releaseTimePass >= this.releaseTime && this.escape(),
            createHint(31, 8, this, 0, -65, !1, 0, -30, !0);
      if ("Dog" == this.xmlName && this.action != ACTION_NORMAL) {
        if (this.action == ACTION_MOVE_TO_BEAR) {
          for (var a = 480, r = 0, s = 0; s < field.bears.length; s++)
            if (field.bears[s].targeted) {
              var o = field.bears[s].x - this.x,
                n = field.bears[s].y - this.y,
                h = Math.sqrt(o * o + n * n);
              a > h && ((a = h), (r = s));
            }
          if (a < 0.5 * this.CollisionRadius) {
            (field.bears[r].state = 11),
              (field.bears[r].dogged = !0),
              (field.bears[r].cage.visible = !0),
              (this.bear = field.bears[r]),
              (this.state = 11),
              (this.action = ACTION_SCARING),
              playSound("dog" + this.up + "_bay");
            var x = library.items[this.Woof.Picture];
            (this.bitmap = x.bitmap),
              (this.width = x.width),
              (this.height = x.height),
              (this.layers = x.layers),
              (this.totalFrames = x.frames);
          } else
            (this.moveTime -= e),
              (this.x += this.speedX * e * this.cageEffect),
              (this.y += this.speedY * e * this.cageEffect);
        }
        this.action == ACTION_SCARING &&
          ((this.bear.cage.visible = !0),
          (this.bear.Progress +=
            (2 * this.bear.ProgressMaxValue * e) /
            (1e3 * this.scareTime[this.bear.up])),
          this.bear.Progress > this.bear.ProgressMaxValue &&
            ((this.bear.Progress = this.bear.ProgressMaxValue),
            (this.bear.dogged = !1),
            (this.bear.targeted = !1),
            (this.bear.captured = !0),
            (this.action = ACTION_NORMAL),
            this.move()));
      }
      0 != this.state &&
        11 != this.state &&
        (this.moveTime - e > e
          ? ((this.moveTime -= e),
            (this.x += this.speedX * e * this.cageEffect),
            (this.y += this.speedY * e * this.cageEffect))
          : (this.moveToProduct && (this.moveToProduct = !1), this.move()));
    }
  });
var pets = [],
  field,
  STATE_GROW = 1,
  STATE_NORMAL = 2,
  ACTION_MOVE_TO_MARKET = 1,
  ACTION_MOVE_TO_FARM = 2,
  ACTION_NONE = 3,
  STATE_MOVE_TO_MARKET = 1,
  STATE_MOVE_TO_FARM = 2,
  STATE_NONE = 3;
Utils.extend(GameField, Sprite),
  (GameField.prototype.addStartPlaces = function () {
    for (var e = 0; 6 > e; e++) this.grounds[e] = [];
    if (this.endless)
      for (var e = 0; 6 > e; e++) {
        addBuildingPlace(e);
        for (var t = 0; 2 > t; t++)
          (this.grounds[e][t] = {}),
            (this.grounds[e][t].Type = e + 6 * t),
            (this.grounds[e][t].PosIndex = e),
            (this.grounds[e][t].Upgrade = 0),
            this.addPlace(
              houseCodeToXmlName(this.grounds[e][t].Type),
              e,
              t + 1
            );
      }
    else {
      var s = config.LevelsRecords.record[this.curLevel];
      if (s.Houses.h)
        if (s.Houses.h.length)
          for (var e = 0; e < s.Houses.h.length; e++) {
            var i = {};
            (i.Type = s.Houses.h[e].Type),
              (i.PosIndex = s.Houses.h[e].PosIndex),
              (i.Upgrade = s.Houses.h[e].Upgrade),
              this.grounds[s.Houses.h[e].PosIndex].push(i);
          }
        else
          (this.grounds[s.Houses.h.PosIndex][0] = {}),
            (this.grounds[s.Houses.h.PosIndex][0].Type = s.Houses.h.Type),
            (this.grounds[s.Houses.h.PosIndex][0].PosIndex =
              s.Houses.h.PosIndex),
            (this.grounds[s.Houses.h.PosIndex][0].Upgrade = s.Houses.h.Upgrade);
      addSprite();
      for (var e = 0; 6 > e; e++)
        if (this.grounds[e].length > 0)
          if ((addBuildingPlace(e), 1 == this.grounds[e].length))
            for (var t = 0; t < this.grounds[e].length; t++)
              0 == this.grounds[e][t].Upgrade
                ? this.addPlace(
                    houseCodeToXmlName(this.grounds[e][t].Type),
                    e,
                    0
                  )
                : this.addHouse(
                    houseCodeToXmlName(this.grounds[e][t].Type),
                    this.grounds[e][t].Upgrade - 1,
                    e,
                    !0
                  );
          else
            0 == this.grounds[e][0].Upgrade && 0 == this.grounds[e][1].Upgrade
              ? (this.addPlace(
                  houseCodeToXmlName(this.grounds[e][0].Type),
                  e,
                  1
                ),
                this.addPlace(
                  houseCodeToXmlName(this.grounds[e][1].Type),
                  e,
                  2
                ))
              : this.grounds[e][0].Upgrade > 0
              ? (this.addHouse(
                  houseCodeToXmlName(this.grounds[e][0].Type),
                  this.grounds[e][0].Upgrade - 1,
                  e,
                  !0
                ),
                this.addPlace(
                  houseCodeToXmlName(this.grounds[e][1].Type),
                  e,
                  3
                ))
              : (this.addHouse(
                  houseCodeToXmlName(this.grounds[e][1].Type),
                  this.grounds[e][1].Upgrade - 1,
                  e,
                  !0
                ),
                this.addPlace(
                  houseCodeToXmlName(this.grounds[e][0].Type),
                  e,
                  3
                ));
    }
  }),
  (GameField.prototype.addEndlessGoal = function (e) {
    for (var t = !0; t; ) {
      for (
        var s = random(0, goals.length - 1), i = !0, a = 0;
        a < this.toGoals.length;
        a++
      )
        if (this.toGoals[a].type == goals[s].Type) {
          i = !1;
          break;
        }
      2 == goals[s].Type &&
        getOpeningCost("DriedEggsHouse", 0) > field.stars &&
        (i = !1),
        3 == goals[s].Type &&
          getOpeningCost("CakeHouse", 0) > field.stars &&
          (i = !1),
        4 == goals[s].Type &&
          getOpeningCost("FlouryCakeHouse", 0) > field.stars &&
          (i = !1),
        6 == goals[s].Type &&
          getOpeningCost("MeatHouse", 0) > field.stars &&
          (i = !1),
        7 == goals[s].Type &&
          getOpeningCost("MeatSpiceHouse", 0) > field.stars &&
          (i = !1),
        8 == goals[s].Type &&
          getOpeningCost("MeatPacketHouse", 0) > field.stars &&
          (i = !1),
        10 == goals[s].Type &&
          getOpeningCost("SourCreamHouse", 0) > field.stars &&
          (i = !1),
        11 == goals[s].Type &&
          getOpeningCost("ButterHouse", 0) > field.stars &&
          (i = !1),
        12 == goals[s].Type &&
          getOpeningCost("CheeseHouse", 0) > field.stars &&
          (i = !1),
        14 == goals[s].Type &&
          getOpeningCost("FanHouse", 0) > field.stars &&
          (i = !1),
        15 == goals[s].Type &&
          getOpeningCost("PlumedHatHouse", 0) > field.stars &&
          (i = !1),
        16 == goals[s].Type &&
          getOpeningCost("CarnivalDressHouse", 0) > field.stars &&
          (i = !1),
        i &&
          (goals[s].EndlessStars <= 20 ||
            goals[s].EndlessStars <= this.totalStars) &&
          (this.addGoal(goals[s].Type, goals[s].Val, e, goals[s].EndlessStars),
          (t = !1));
    }
  }),
  (GameField.prototype.addGoal = function (e, t, s, i) {
    var a = convertGoal(e);
    this[a] = t;
    var r = "money" == a ? "ui_level/gold_coin" : "depot/icon_" + a,
      o = addSprite(!1, r, 357 + 35 * s, 273, 0.8);
    if (
      (o.setZIndex(5e3),
      "money" == a && o.gotoAndStop(3),
      (o[a] = r),
      (o.value = 0),
      (o.valueText = numbersGold(o.value, -2, 20, 0.9, o, 1)),
      (o.max = t),
      (o.type = e),
      (o.name = r),
      (o.attr = petToCode(a)),
      (o.slash = textFutura(-2, 20, "/", 9, o)),
      i && (o.endlessStars = i),
      t >= 1e3)
    ) {
      var n = Math.floor(t / 1e3),
        h = n + "K";
      o.neededValue = textFutura(0, 20, h, 9, o, 0);
    } else o.neededValue = numbersSilver(t, 4, 20, 0.9, o, 0, -3);
    this.toGoals[s] = o;
  }),
  (GameField.prototype.addGoals = function () {
    for (var e = 0; 30 > e; e++) this[convertGoal(e)] = 0;
    if (this.endless)
      for (var e = 0; 4 > e; e++)
        for (var t = !0; t; ) {
          for (
            var s = random(0, goals.length - 1), i = !0, a = 0;
            a < this.toGoals.length;
            a++
          )
            if (this.toGoals[a].type == goals[s].Type) {
              i = !1;
              break;
            }
          goals[s].Type >= 2 && goals[s].Type <= 16 && (i = !1),
            i &&
              (goals[s].EndlessStars <= 20 ||
                goals[s].EndlessStars <= this.totalStars) &&
              (this.addGoal(
                goals[s].Type,
                goals[s].Val,
                e,
                goals[s].EndlessStars
              ),
              (t = !1));
        }
    else {
      var r = config.LevelsRecords.record[this.curLevel];
      if (r.Goals.goal.length)
        for (var e = 0; e < r.Goals.goal.length; e++)
          this.addGoal(
            r.Goals.goal[e].Type,
            r.Goals.goal[e].Val,
            field.toGoals.length
          );
      else
        this.addGoal(r.Goals.goal.Type, r.Goals.goal.Val, field.toGoals.length);
      (this.timeGold = r.GoldTime), (this.timeSilver = r.SilverTime);
    }
  }),
  (GameField.prototype.addBearsArray = function () {
    if (this.endless)
      (this.bearsArray[0] = {}),
        (this.bearsArray[0].Type = 2),
        (this.bearsArray[0].Time = 15),
        (this.bearsArray[0].activated = !1);
    else {
      var e = config.LevelsRecords.record[this.curLevel];
      if (e.BearTimes && e.BearTimes.t)
        if (e.BearTimes.t.length)
          for (var t = 0; t < e.BearTimes.t.length; t++)
            this.bearsArray.push(e.BearTimes.t[t]);
        else this.bearsArray.push(e.BearTimes.t);
      for (var t = 0; t < this.bearsArray.length; t++)
        this.bearsArray[t].activated = !1;
    }
  }),
  (GameField.prototype.addMiniMap = function () {
    var e = addSprite(
      !1,
      this.miniMap.Picture,
      0.6 * this.miniMap.position[0],
      0.533 * this.miniMap.position[1]
    );
    e.x += 0.1 * e.width;
    var e = addSprite(
      !1,
      this.miniMap.CostText.Coin.Picture,
      this.miniMap.CostText.Coin.position[0],
      this.miniMap.CostText.Coin.position[1]
    );
    (e.animDelay = 2),
      (this.levelMoney = numbersGold(
        money,
        this.miniMap.CostText.position[0],
        this.miniMap.CostText.position[1],
        1
      ));
  }),
  (GameField.prototype.hintArrow = function () {
    (this.noHintArrow = !1),
      this.hint && (this.hint.destroy = !0),
      (this.hint = addSprite(!1, "misc/red_arrow", 340, 35)),
      (this.hint.scaleX = -1),
      (this.hint.scaleY = -1),
      this.hint.fadeTo(0, 3e3, null, function (e) {
        e.target.obj.destroy = !0;
      }),
      createHint(30, 2, stage, 400, 80, !1, 5, 0, !1);
  }),
  (GameField.prototype.addAvia = function (e) {
    playSound("airplane_flyin"), (this.aviaCurrency = e);
    var t = this.miniMapAvia.HorseToMarket;
    (this.miniAvia = addSprite(
      !1,
      t["Picture" + field.bigAvia.curUp],
      t.position[0],
      t.position[1]
    )),
      (this.miniAvia.scaleX = -1),
      (this.miniAvia.text = addSprite(
        !1,
        "ui_level/minimap_cost",
        15,
        8,
        1,
        this.miniAvia
      )),
      (this.miniAvia.text.scaleX = -1),
      textFutura(
        12,
        0,
        this.aviaCurrency,
        7,
        this.miniAvia.text,
        1,
        null,
        "#000",
        "#000"
      ),
      (this.state = STATE_MOVE_TO_MARKET),
      (this.bigAvia.visible = !1);
  }),
  (GameField.prototype.addCar = function (e) {
    playSound("car_came"), (this.carCurrency = e);
    var t = this.miniMap.HorseToMarket;
    (this.miniCar = addSprite(
      !1,
      t["Picture" + field.bigCar.curUp],
      t.position[0],
      t.position[1]
    )),
      (this.miniCar.scaleX = -1),
      (this.miniCar.text = addSprite(
        !1,
        "ui_level/minimap_cost",
        15,
        8,
        1,
        this.miniCar
      )),
      (this.miniCar.text.scaleX = -1),
      textFutura(
        12,
        0,
        this.carCurrency,
        7,
        this.miniCar.text,
        1,
        null,
        "#000",
        "#000"
      ),
      (this.action = ACTION_MOVE_TO_MARKET),
      (this.bigCar.visible = !1),
      depot.reDraw();
  }),
  (GameField.prototype.addUI = function () {
    function e(e, t, s, i) {
      var a = s ? e["UpState" + i].Picture : e.Picture,
        r = addSprite(
          !1,
          a,
          e.position[0],
          0.533 * e.position[1],
          1,
          stage,
          null,
          e.deep + 1e3
        );
      money >= e.Cost ? r.gotoAndStop(0) : r.gotoAndStop(3),
        (r.cost = e.Cost),
        (r.petType = t),
        field.petButtons.push(r);
    }
    if (!this.endless) {
      var t = config.LevelsRecords.record[this.curLevel];
      if (t.StartPets && t.StartPets.Pet)
        if (t.StartPets.Pet.length)
          for (var s = 0; s < t.StartPets.Pet.length; s++)
            this.addPet(t.StartPets.Pet[s].Type);
        else this.addPet(t.StartPets.Pet.Type);
      addMoney(config.LevelsRecords.record[this.curLevel].StartMoney),
        (this.moneyGoal = money);
    }
    var t = this.gameUI.Background.Picture[0],
      i = addSprite(!0, t.Picture, 0.6 * t.position[0], 0.533 * t.position[1]),
      t = this.gameUI.Background.Picture[2],
      a = addSprite(
        !1,
        t.Picture,
        t.position[0],
        0.533 * t.position[1],
        1,
        stage,
        null,
        t.deep + 1e3
      );
    correctPosition(a),
      e(this.gameUI.BuyChickenButton, 0),
      e(this.gameUI.BuyPigButton, 1),
      e(this.gameUI.BuyCowButton, 2),
      e(this.gameUI.BuyDogButton, 4, !0, 0),
      e(this.gameUI.BuyCatButton, 5, !0, 0),
      e(this.gameUI.BuyOstrichButton, 3);
    var r = 110,
      o = 250,
      n = 240,
      h = 190,
      l = 150,
      p = 100,
      d = Math.sqrt(1 - (p * p) / (l * l)),
      c = l * d;
    (i.onmousedown = function () {
      hint.active &&
        !hint.noAction &&
        (hint.pause || field.unsetPause(), (hint.destroy = !0), (hint = {}));
    }),
      (i.onmouseup = function (e) {
        var t = e.x + e.target.x,
          s = e.y + e.target.y,
          i = Math.sqrt((t - n + c) * (t - n + c) + (s - h) * (s - h)),
          a = Math.sqrt((t - n - c) * (t - n - c) + (s - h) * (s - h));
        2 * l > i + a &&
          o >= s &&
          s >= r &&
          3 != field.well.curUp &&
          field.addGrass(e),
          hint.active &&
            hint.noAction &&
            (hint.pause || field.unsetPause(),
            (hint.destroy = !0),
            (hint = {}));
      });
    var a = addSprite(!1, "ui_level/level_bottom", 240, 288);
    if (
      (a.setZIndex(3e3),
      (a = addSprite(!1, "buttons/btn_big_screen", 35, 300)),
      a.stop(),
      (a.onmousedown = setFirstFrame),
      (a.onmouseout = setZeroFrame),
      (a.onmouseup = function (e) {
        playSound("ui_button_click"), setZeroFrame(e), changeScreen();
      }),
      (a = addSprite(!1, "buttons/btn_menu", 75, 300)),
      a.stop(),
      (a.onmousedown = setFirstFrame),
      (a.onmouseout = setZeroFrame),
      (a.onmouseup = function (e) {
        playSound("ui_button_click"), setZeroFrame(e), field.showPause();
      }),
      (this.menuButton = a),
      (this.goalButton = addSprite(!1, "ui_level/but_panel", 408, 289)),
      this.goalButton.setZIndex(4e3),
      this.goalButton.stop(),
      this.endless)
    )
      (this.starsValue = numbersSilver(
        0,
        -15,
        20,
        1.2,
        this.goalButton,
        2,
        -2
      )),
        addSprite(!1, "ui_level/menu_star", 40, 20, 0.8, this.goalButton);
    else {
      addSprite(!1, "ui_level/play_clock", -50, 20, 1, this.goalButton),
        (this.strip = addSprite(
          !1,
          "ui_level/play_strip",
          30,
          20,
          1,
          this.goalButton
        ));
      var t = config.LevelsRecords.record[this.curLevel];
      (this.timeGold = t.GoldTime),
        (this.timeSilver = t.SilverTime),
        (this.timePass = numbersSilver(
          convertTime(this.timeReal),
          -15,
          20,
          0.9,
          this.goalButton,
          2,
          -2
        )),
        (this.timeNeed = numbersGold(
          convertTime(this.timeGold),
          30,
          20,
          0.9,
          this.goalButton,
          2,
          -2
        ));
    }
  }),
  (GameField.prototype.setPause = function () {
    this.pause = !0;
    for (var e = 0; e < stage.tweens.length; e++)
      stage.tweens[e].pause(), (stage.tweens[e].pausedManually = !0);
  }),
  (GameField.prototype.unsetPause = function () {
    field.pause = !1;
    for (var e = 0; e < stage.tweens.length; e++)
      stage.tweens[e].pausedManually && stage.tweens[e].play();
  }),
  (GameField.prototype.showGoals = function () {
    if (!field.pause) {
      this.setPause(),
        this.menuButton.gotoAndStop(3),
        (this.menuButton.onmousedown = null),
        (this.menuButton.onmouseout = null),
        (this.menuButton.onmouseup = null);
      var e = addSprite(!1, "ui_level/goal_onlevel", 240, 160);
      (e.opacity = 0),
        e.fadeTo(1, 500),
        (s = addSprite(!1, "buttons/button_6", 0, 90, 1, e)),
        s.stop(),
        (s.onmousedown = setFirstFrame),
        (s.onmouseout = setZeroFrame),
        (s.onmouseup = function (t) {
          playSound("ui_button_click"), setZeroFrame(t), field.unPause(e);
        }),
        textFutura(0, -2, I18.f("ok"), 11, s, 2);
      for (var t = 0; t < field.toGoals.length; t++) {
        var s = addSprite(!1, field.toGoals[t].name, -84, -47 + 30 * t, 1, e);
        numbersSilver(field.toGoals[t].max, 115, 0, 1, s, 2, -2);
      }
      textBold(
        0,
        -90,
        I18.f("purpose_level"),
        20,
        e,
        2,
        "bold",
        "#8B4513",
        null,
        0.5
      );
    }
  }),
  (GameField.prototype.showPause = function (e) {
    if (!this.pause || e) {
      this.setPause(),
        this.menuButton.gotoAndStop(3),
        (this.menuButton.onmousedown = null),
        (this.menuButton.onmouseout = null),
        (this.menuButton.onmouseup = null);
      var t = addSprite(!1, "ui_level/pause_panel", 240, 160);
      (t.opacity = 0),
        t.fadeTo(1, 500),
        (mc = addSprite(!1, "buttons/button_6", 0, -60, 1, t)),
        mc.stop(),
        (mc.onmousedown = setFirstFrame),
        (mc.onmouseout = setZeroFrame),
        (mc.onmouseup = function (e) {
          playSound("ui_button_click"), setZeroFrame(e), field.unPause(t);
        }),
        textFutura(0, -2, I18.f("continue"), 11, mc, 2),
        (mc = addSprite(!1, "buttons/button_6", 0, -35, 1, t)),
        mc.stop(),
        (mc.onmousedown = setFirstFrame),
        (mc.onmouseout = setZeroFrame),
        (mc.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            field.showCheck(t, showMenu);
        }),
        textFutura(0, -2, I18.f("main_menu"), 11, mc, 2),
        (mc = addSprite(!1, "buttons/button_6", 0, -10, 1, t)),
        mc.stop(),
        (mc.onmousedown = setFirstFrame),
        (mc.onmouseout = setZeroFrame),
        (mc.onmouseup = function (e) {
          return (
            playSound("ui_button_click"),
            setZeroFrame(e),
            startLevel(field.curLevel),
            !1
          );
        }),
        textFutura(0, -2, I18.f("restart"), 11, mc, 2),
        (mc = addSprite(!1, "buttons/button_6", 0, 15, 1, t)),
        mc.stop(),
        (mc.onmousedown = setFirstFrame),
        (mc.onmouseout = setZeroFrame),
        (mc.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            field.showCheck(t, showMap);
        }),
        textFutura(0, -2, I18.f("level_map"), 11, mc, 2),
        (mc = addSprite(!1, "buttons/button_6", 0, 40, 1, t)),
        mc.stop(),
        (mc.onmousedown = setFirstFrame),
        (mc.onmouseout = setZeroFrame),
        (mc.onmouseup = function (e) {
          playSound("ui_button_click"), setZeroFrame(e), field.showOptions(t);
        }),
        textFutura(0, -2, I18.f("options"), 11, mc, 2),
        (mc = addSprite(!1, "buttons/button_6", 0, 65, 1, t)),
        mc.stop(),
        (mc.onmousedown = setFirstFrame),
        (mc.onmouseout = setZeroFrame),
        (mc.onmouseup = function (e) {
          playSound("ui_button_click"), setZeroFrame(e), field.showHelp(t);
        }),
        textFutura(0, -2, I18.f("help"), 11, mc, 2);
    }
  }),
  (GameField.prototype.showOptions = function (e) {
    function t() {
      var e = addSprite(!1, "main/option_send2", 240, 160);
      (e.opacity = 0),
        e.fadeTo(1, 500),
        textFutura(
          0,
          -11,
          I18.f("sound"),
          12,
          e,
          2,
          null,
          "#000000",
          "#000000"
        ),
        textFutura(
          -1,
          14,
          I18.f("music"),
          12,
          e,
          2,
          null,
          "#000000",
          "#000000"
        );
      var t = addSprite(!1, "main/checkbox", 40, -11, 1, e),
        s = soundOn ? 0 : 1;
      t.gotoAndStop(s), (t.onmouseup = toggleSound);
      var t = addSprite(!1, "main/checkbox", 40, 14, 1, e),
        s = musicOn ? 0 : 1;
      t.gotoAndStop(s), (t.onmouseup = toggleMusic);
      var t = addSprite(!1, "buttons/button_6", 0, 55, 1, e);
      t.stop(),
        (t.onmousedown = setFirstFrame),
        (t.onmouseout = setZeroFrame),
        (t.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            (e.target.parent.destroy = !0),
            field.showPause(!0);
        }),
        textFutura(0, -2, I18.f("ok"), 12, t, 2);
    }
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0), t();
    });
  }),
  (GameField.prototype.showCheck = function (e, t) {
    function s() {
      var e = addSprite(!1, "ui_level/yes_no_panel", 240, 160);
      writeFontWhite2(I18.f("leave_game"), 0, -15, 1, e, 2);
      var s = addSprite(!1, "buttons/button_5", -40, 35, 1, e);
      s.stop(),
        (s.onmousedown = setFirstFrame),
        (s.onmouseout = setZeroFrame),
        (s.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            (e.target.parent.destroy = !0),
            t();
        }),
        textFutura(0, -2, I18.f("yes"), 11, s, 2);
      var s = addSprite(!1, "buttons/button_5", 40, 35, 1, e);
      s.stop(),
        (s.onmousedown = setFirstFrame),
        (s.onmouseout = setZeroFrame),
        (s.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            (e.target.parent.destroy = !0),
            field.showPause(!0);
        }),
        textFutura(0, -2, I18.f("no"), 11, s, 2);
    }
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0), s();
    });
  }),
  (GameField.prototype.showHelp = function (e) {
    function t() {
      var e = addSprite(!1, "help/help_page1", 240, 160);
      ExternalAPI.exec("addLogo", 0, -e.height / 2 + 20, !0, e),
        ExternalAPI.exec("addKiz10Logo", 0, -e.height / 2 + 20, e),
        (i = addSprite(!1, "buttons/button_5", 0, 127, 1, e)),
        i.stop(),
        (i.onmousedown = setFirstFrame),
        (i.onmouseout = setZeroFrame),
        (i.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            (e.target.parent.destroy = !0),
            field.showPause(!0);
        }),
        textFutura(0, -2, I18.f("ok"), 11, i, 2),
        (i = addSprite(!1, "buttons/button_5", 70, 127, 1, e)),
        i.stop(),
        (i.onmousedown = setFirstFrame),
        (i.onmouseout = setZeroFrame),
        (i.onmouseup = function (t) {
          return playSound("ui_button_click"), setZeroFrame(t), s(e), !1;
        }),
        textFutura(0, -2, I18.f("help_next"), 11, i, 2);
    }
    function s() {
      var e = addSprite(!1, "help/help_page2", 240, 160);
      ExternalAPI.exec("addLogo", 0, -e.height / 2 + 20, !0, e),
        ExternalAPI.exec("addKiz10Logo", 0, -e.height / 2 + 20, !0, e),
        (i = addSprite(!1, "buttons/button_5", 0, 127, 1, e)),
        i.stop(),
        (i.onmousedown = setFirstFrame),
        (i.onmouseout = setZeroFrame),
        (i.onmouseup = function (e) {
          playSound("ui_button_click"),
            setZeroFrame(e),
            (e.target.parent.destroy = !0),
            field.showPause(!0);
        }),
        textFutura(0, -2, I18.f("ok"), 11, i, 2),
        (i = addSprite(!1, "buttons/button_5", -70, 127, 1, e)),
        i.stop(),
        (i.onmousedown = setFirstFrame),
        (i.onmouseout = setZeroFrame),
        (i.onmouseup = function (s) {
          return playSound("ui_button_click"), setZeroFrame(s), t(e), !1;
        }),
        textFutura(0, -2, I18.f("help_prev"), 11, i, 2);
    }
    var i;
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0), t();
    });
  }),
  (GameField.prototype.unPause = function (e) {
    e.fadeTo(0, 500, null, function (e) {
      (e.target.obj.destroy = !0),
        field.unsetPause(),
        field.menuButton.gotoAndStop(0),
        (field.menuButton.onmousedown = setFirstFrame),
        (field.menuButton.onmouseout = setZeroFrame),
        (field.menuButton.onmouseup = function (e) {
          playSound("ui_button_click"), setZeroFrame(e), field.showPause();
        });
    });
  }),
  (GameField.prototype.addPet = function (e) {
    var t,
      s = !0;
    switch (e) {
      case 0:
        t = Chicken;
        break;
      case 1:
        t = Pig;
        break;
      case 2:
        t = Cow;
        break;
      case 4:
        (t = Dog), (s = !1), this.addDog();
        break;
      case 5:
        (t = Cat), (s = !1), this.addCat();
        break;
      case 3:
        t = Ostrich;
    }
    if (s) {
      var i = new t(stage);
      (i.id = e), this.petsNum[e]++, this.pets.push(i);
    }
    for (var a = 0; a < field.petButtons.length; a++)
      field.petButtons[a].cost > money && field.petButtons[a].gotoAndStop(3);
  }),
  (GameField.prototype.addBear = function (e) {
    var t = new Bear(stage, e);
    this.bears.push(t);
  }),
  (GameField.prototype.addDog = function () {
    var e = new Dog(stage, config.accessDog);
    this.dogs.push(e);
  }),
  (GameField.prototype.addCat = function () {
    var e = new Cat(stage, config.accessCat);
    this.cats.push(e);
  }),
  (GameField.prototype.addProduction = function (e, t, s) {
    var i = new Production(e, t, s);
    return (
      stage.addChild(i),
      this.products.push(i),
      "Egg" == e && createHint(3, 2, i, 75, 35, !1, 5, -10),
      i
    );
  }),
  (GameField.prototype.addFlyingProduction = function (e) {
    (x = 120 + random(0, 275)), (y = 115 + random(0, 130));
    var t = random(10, 15);
    y -= (320 * t) / 10;
    var s = new Production(e, x, y);
    stage.addChild(s), s.fall(t), this.products.push(s);
  }),
  (GameField.prototype.addBigCar = function (e) {
    var t = new Car(e);
    stage.addChild(t), (this.bigCar = t);
    var s = random(10, 30);
    (this.bigCar.y -= (320 * s) / 10), this.bigCar.fall(s);
  }),
  (GameField.prototype.addBigAvia = function (e) {
    var t = new Avia(e);
    stage.addChild(t), (this.bigAvia = t);
    var s = random(10, 30);
    (this.bigAvia.y -= (320 * s) / 10), this.bigAvia.fall(s);
  }),
  (GameField.prototype.addDepot = function () {
    (depot = new Depot()),
      (depot.x = depot.position[0] - 20),
      (depot.y = depot.position[1]),
      stage.addChild(depot);
    var e = random(10, 30);
    (depot.y -= (320 * e) / 10), depot.fall(e);
  }),
  (GameField.prototype.addHouse = function (e, t, s, i) {
    var a = config.Game.BuildingPlaces["p" + s].BuildingPos[0],
      r = config.Game.BuildingPlaces["p" + s].BuildingPos[1],
      o = random(10, 30),
      n = new House(e, t, a, r - (320 * o) / 10);
    (n.groundType = s),
      stage.addChild(n),
      i && (n.isStart = !0),
      n.fall(o),
      this.buildings.push(n);
  }),
  (GameField.prototype.addPlace = function (e, t, s) {
    var i = places[t][s].x,
      a = places[t][s].y,
      r = new HousePlace(e, i, a);
    (r.groundType = t),
      (r.correcting = s),
      stage.addChild(r),
      this.places.push(r);
    var o = random(10, 30);
    (r.y -= (320 * o) / 10), r.fall(o);
  }),
  (GameField.prototype.addWell = function (e) {
    var t = new Well(e);
    stage.addChild(t), (this.well = t);
    var s = random(10, 30);
    (this.well.y -= (320 * s) / 10), this.well.fall(s);
  }),
  (GameField.prototype.addGrass = function (e) {
    if (!field.pause) {
      if (landCheck) return void (landCheck = !1);
      if (this.well.autoFill)
        var t = 120 + random(0, 275),
          s = 115 + random(0, 130);
      else {
        var t = e.x + e.target.x,
          s = e.y + e.target.y;
        if (0 == this.well.waterActual || this.well.reloading)
          return void (0 == this.well.waterActual && this.well.hintArrow());
      }
      for (var i = 5, a = 0; 3 > a; a++)
        for (var r = 0; 3 > r; r++)
          if (2 != r || (0 != a && 2 != a)) {
            if (
              ((dx = 1 == a ? t - i + i * r : t - 8 + i * r),
              (dy = s - i + i * a),
              1 == a && 1 == r)
            ) {
              var o = addSprite(!1, "misc/water_drops", dx, dy);
              o.setZIndex(1e4),
                (o.animDelay = 2),
                (o.onchangeframe = function (e) {
                  (e.target.currentFrameX != e.target.framesCount - 1 &&
                    e.target.currentFrame != e.target.totalFrames - 1) ||
                    (e.target.destroy = !0);
                });
              var n = 6;
            } else var n = 2;
            var h = new Grass(dx, dy, n);
            h.gotoAndPlay(0),
              (h.cur = n),
              (h.animDelay = 2),
              (h.onchangeframe = function (e) {
                (e.target.currentFrameX != e.target.cur &&
                  e.target.currentFrame != e.target.cur) ||
                  (e.target.stop(),
                  (e.target.animDelay = -1),
                  (e.target.animDirection = 1),
                  (e.target.state = STATE_NORMAL));
              }),
              this.grass.push(h);
          }
      playSound("action_watering"), this.well.update();
    }
  }),
  (GameField.prototype.removePet = function () {
    for (var e = 0; e < stage.tweens.length; e++)
      10 == stage.tweens[e].obj.state && stage.tweens[e].stop();
    for (var e = 0; e < this.pets.length; e++)
      10 == this.pets[e].state &&
        (this.petsNum[this.pets[e].id]--, this.pets.splice(e, 1));
    for (var e = 0; e < this.bears.length; e++)
      10 == this.bears[e].state && this.bears.splice(e, 1);
  }),
  (GameField.prototype.addMarketProducts = function () {
    for (var e = 0; e < depot.booking.length; e++)
      for (var t = 0; t < depot.booking[e].num; t++) {
        var s = productNameToXmlName(depot.booking[e].id);
        this.addFlyingProduction(s);
      }
    depot.booking = [];
  }),
  (GameField.prototype.preTick = function (e) {
    if (!this.pause) {
      this.endless &&
        ((this.noHouseDestroyTimer -= e / 1e3),
        (this.noPetKillTimer -= e / 1e3)),
        0 == field.curLevel &&
          field.timeReal > 5 &&
          createHint(32, 7, this, 240, 160, !1, 5, -10, !0),
        0 == field.curLevel &&
          field.timeReal > 6 &&
          createHint(1, 0, this, 280, 200, !1, 10, -10),
        0 == field.curLevel &&
          field.timeReal > 9 &&
          createHint(2, 2, stage, 90, 65, !1, 10, -10),
        0 == field.curLevel &&
          field.timeReal > 26 &&
          createHint(4, 8, stage, 407, 210, !1, 0, 0, !0),
        field.curLevel > 0 &&
          field.timeReal > 30 &&
          createHint(33, 8, stage, 300, 215, !1, 0, -10, !0),
        field.curLevel > 0 &&
          field.timeReal > 3 &&
          createHint(6, 8, this.bigCar, 0, -70, !1, 0, -10, !0),
        field.curLevel > 0 &&
          field.timeReal > 5 &&
          createHint(10, 8, depot, 0, -70, !1, 0, -25, !0),
        4 == field.curLevel &&
          0 == field.well.waterActual &&
          money < field.well.fillCost &&
          field.pets.length > 0 &&
          (("ru" != I18.currentLocale &&
            "en" != I18.currentLocale &&
            "fr" != I18.currentLocale &&
            "es" != I18.currentLocale) ||
            createHint(34, 8, this, 140, 205, !1, 5, -10, !1)),
        4 == field.curLevel &&
          field.toGoals[0].value >= 12 &&
          0 == depot.p[16] &&
          !gameData.hints[35] &&
          (("ru" != I18.currentLocale &&
            "en" != I18.currentLocale &&
            "fr" != I18.currentLocale &&
            "es" != I18.currentLocale) ||
            (createHint(35, 8, this, 305, 205, !1, 5, -20, !1),
            (this.airplaneHintTimer = 4e4))),
        this.airplaneHintTimer > 0 &&
          ((this.airplaneHintTimer -= e),
          this.airplaneHintTimer <= 0 &&
            (("ru" != I18.currentLocale &&
              "en" != I18.currentLocale &&
              "fr" != I18.currentLocale &&
              "es" != I18.currentLocale) ||
              createHint(36, 8, this, 305, 205, !1, 5, -30, !1)));
      for (var t = 0; t < this.petsNum.length; t++)
        for (var s = 0; s < this.toGoals.length; s++)
          if (
            this.toGoals[s].attr == t &&
            this.toGoals[s][codeToPet(t)] &&
            (this.toGoals[s].valueText.write(this.petsNum[t]),
            (this.toGoals[s].value = this.petsNum[t]),
            this.petsNum[t] >= this.toGoals[s].max && !this.toGoals[s].aimed)
          )
            if (
              ((this.toGoals[s].aimed = !0),
              playSound("fanfare_aim"),
              (this.toGoals[s].destroy = !0),
              this.endless)
            )
              addEndlessStars(this.toGoals[s].endlessStars),
                (this.toGoals[s].aimed = !1),
                (this.toGoals[s] = {}),
                this.addEndlessGoal(s);
            else {
              var i = addSprite(
                !1,
                this.toGoals[s].name,
                this.toGoals[s].x,
                this.toGoals[s].y,
                0.8
              );
              i.setZIndex(5e3),
                addSprite(!1, "ui_level/goal_done", 0, 20, 0.8, i);
            }
      for (var s = 0; s < this.toGoals.length; s++)
        for (var a in this.toGoals[s])
          "money" == a &&
            (this.toGoals[s].valueText.write(money),
            (this.toGoals[s].value = money));
      if (((this.timeReal += e / 1e3), !this.endless)) {
        for (var r = !0, s = 0; s < this.petsNum.length; s++)
          for (var t = 0; t < this.toGoals.length; t++)
            if (
              this[convertGoal(s + 17)] > 0 &&
              this[convertGoal(s + 17)] > this.petsNum[s] &&
              this.toGoals[t][convertGoal(s + 17)] &&
              !this.toGoals[t].aimed
            ) {
              r = !1;
              break;
            }
        if (r)
          for (var o = !0, s = 0; 30 > s; s++)
            if (0 != this[convertGoal(s)] && (17 > s || s > 20)) {
              o = !1;
              break;
            }
        o &&
          (field.setPause(),
          stage.setTimeout(function () {
            showWin();
          }, 500)),
          this.timePass.write(convertTime(Math.floor(this.timeReal))),
          1 == this.goal &&
            this.timeReal > this.timeGold &&
            ((this.strip.destroy = !0),
            (this.strip = addSprite(
              !1,
              "ui_level/play_strip_silver",
              30,
              20,
              1,
              this.goalButton
            )),
            this.timeNeed.write(""),
            (this.timeNeed = numbersSilver(
              convertTime(this.timeSilver),
              30,
              20,
              0.9,
              this.goalButton,
              2,
              -2
            )),
            this.goal++),
          2 == this.goal &&
            this.timeReal > this.timeSilver &&
            ((this.strip.destroy = !0), this.timeNeed.write(""), this.goal++);
      }
      this.well.tick(e),
        this.levelMoney.write(money),
        this.action == ACTION_MOVE_TO_FARM &&
          ((this.miniCar.x -=
            (70 * e) /
            (500 * this.car.Upgrades["Up" + field.bigCar.curUp].HorsePeriod)),
          this.miniCar.x <= 405 &&
            (playSound("car_came"),
            (this.action = ACTION_NONE),
            addMoney(this.carCurrency),
            (this.miniCar.destroy = !0),
            (this.carCurrency = 0),
            (this.bigCar.visible = !0))),
        this.action == ACTION_MOVE_TO_MARKET &&
          ((this.miniCar.x +=
            (70 * e) /
            (500 * this.car.Upgrades["Up" + field.bigCar.curUp].HorsePeriod)),
          this.miniCar.x >= 470 &&
            (playSound("action_sell_buy"),
            (this.action = ACTION_MOVE_TO_FARM),
            (this.miniCar.scaleX = 1),
            (this.miniCar.text.destroy = !0),
            (this.miniCar.text = addSprite(
              !1,
              "ui_level/minimap_cost",
              -15,
              8,
              1,
              this.miniCar
            )),
            (this.miniCar.text.scaleX = 1),
            textFutura(
              12,
              0,
              this.carCurrency,
              7,
              this.miniCar.text,
              1,
              null,
              "#000",
              "#000"
            ))),
        this.state == STATE_MOVE_TO_FARM &&
          ((this.miniAvia.x -=
            (70 * e) /
            (500 * this.car.Upgrades["Up" + field.bigAvia.curUp].HorsePeriod)),
          this.miniAvia.x <= 405 &&
            ((this.state = STATE_NONE),
            this.addMarketProducts(),
            (this.miniAvia.destroy = !0),
            (this.aviaCurrency = 0),
            (this.bigAvia.visible = !0))),
        this.state == STATE_MOVE_TO_MARKET &&
          ((this.miniAvia.x +=
            (70 * e) /
            (500 * this.car.Upgrades["Up" + field.bigAvia.curUp].HorsePeriod)),
          this.miniAvia.x >= 470 &&
            (playSound("action_sell_buy"),
            (this.state = STATE_MOVE_TO_FARM),
            (this.miniAvia.scaleX = 1),
            (this.miniAvia.text.destroy = !0),
            (this.miniAvia.text = addSprite(
              !1,
              "ui_level/minimap_cost",
              -15,
              8,
              1,
              this.miniAvia
            )),
            (this.miniAvia.text.scaleX = 1),
            textFutura(
              12,
              0,
              this.aviaCurrency,
              7,
              this.miniAvia.text,
              1,
              null,
              "#000",
              "#000"
            )));
      for (var s = 0; s < this.petButtons.length; s++)
        this.petButtons[s].cost > money
          ? ((this.petButtons[s].onmousedown = function () {}),
            (this.petButtons[s].onmouseout = function () {}),
            (this.petButtons[s].onmouseup = function () {}))
          : ((this.petButtons[s].onmousedown = setFirstFrame),
            (this.petButtons[s].onmouseout = setZeroFrame),
            (this.petButtons[s].onmouseup = function (e) {
              field.pause ||
                (addMoney(-e.target.cost),
                field.addPet(e.target.petType),
                money < e.target.cost ? setThirdFrame(e) : setZeroFrame(e));
            }));
      for (var s = 0; s < this.starButtons.length; s++)
        this.starButtons[s].visible &&
          (this.starButtons[s].cost > field.stars
            ? ((this.starButtons[s].onmousedown = function () {}),
              (this.starButtons[s].onmouseout = function () {}),
              (this.starButtons[s].onmouseup = function () {}),
              this.starButtons[s].gotoAndStop(2))
            : ((this.starButtons[s].onmousedown = setFirstFrame),
              (this.starButtons[s].onmouseout = setZeroFrame),
              (this.starButtons[s].onmouseup = function (e) {
                if (
                  (addEndlessStars(-e.target.cost),
                  field.stars < e.target.cost
                    ? setSecondFrame(e)
                    : setZeroFrame(e),
                  (e.target.onmouseup = function () {}),
                  e.target.parent.xmlHouse)
                ) {
                  for (var t = 0; t < field.starButtons.length; t++)
                    field.starButtons[t].parent.groundType ==
                      e.target.parent.groundType &&
                      field.starButtons[t].parent.correcting ==
                        e.target.parent.correcting &&
                      (field.starButtons[t].visible = !1);
                  for (var t = 0; t < field.upButtons.length; t++)
                    field.upButtons[t].parent.groundType ==
                      e.target.parent.groundType &&
                      field.upButtons[t].parent.correcting ==
                        e.target.parent.correcting &&
                      (field.upButtons[t].visible = !0);
                } else
                  (e.target.parent.starUp.visible = !1),
                    (e.target.parent.up.visible = !0);
                return !1;
              })));
      for (var s = 0; s < this.upButtons.length; s++)
        this.upButtons[s].visible &&
          (this.upButtons[s].cost > money
            ? ((this.upButtons[s].onmousedown = function () {}),
              (this.upButtons[s].onmouseout = function () {}),
              (this.upButtons[s].onmouseup = function () {}),
              this.upButtons[s].gotoAndStop(2))
            : ((this.upButtons[s].onmousedown = setFirstFrame),
              (this.upButtons[s].onmouseout = setZeroFrame),
              (this.upButtons[s].onmouseup = function (e) {
                if (
                  (addMoney(-e.target.cost),
                  money < e.target.cost ? setSecondFrame(e) : setZeroFrame(e),
                  (e.target.onmouseup = function () {}),
                  e.target.parent.xmlHouse)
                ) {
                  for (var t = 0; t < field.upButtons.length; t++)
                    field.upButtons[t].parent.groundType ==
                      e.target.parent.groundType &&
                      (field.upButtons.splice(t, 1), t--);
                  for (var t = 0; t < field.starButtons.length; t++)
                    field.starButtons[t].parent.groundType ==
                      e.target.parent.groundType &&
                      (field.starButtons.splice(t, 1), t--);
                  field.addHouse(
                    e.target.parent.xmlHouse,
                    0,
                    e.target.parent.groundType
                  );
                } else playSound("action_upgrade"), e.target.parent.upgrade();
                return !1;
              })));
      for (var s = 0; s < this.bearsArray.length; s++)
        if (
          this.timeReal >= this.bearsArray[s].Time &&
          !this.bearsArray[s].activated &&
          ((this.bearsArray[s].activated = !0),
          this.addBear(this.bearsArray[s].Type),
          this.endless)
        ) {
          for (var n = !0, h = 0; h < this.bearsArray.length; h++)
            this.bearsArray[h].Time != this.bearsArray[s].Time ||
              this.bearsArray[h].activated ||
              (n = !1);
          if (n)
            for (
              var l = config.Game.EndlessMode,
                p = random(l.BearWaitTime[0], l.BearWaitTime[1]),
                d = random(l.BearCount[0], l.BearCount[1]),
                t = 0;
              d > t;
              t++
            ) {
              var c = {};
              (c.Type = 0),
                field.petsNum[0] > 0 && (c.Type = random(0, 1)),
                field.petsNum[1] > 0 && (c.Type = random(0, 2)),
                field.petsNum[2] > 0 && (c.Type = random(1, 3)),
                field.petsNum[3] > 0 && (c.Type = random(2, 3)),
                (c.Time = this.bearsArray[s].Time + p),
                (c.activated = !1),
                this.bearsArray.push(c);
            }
        }
      for (var s = 0; s < this.pets.length; s++) this.pets[s].tick(e);
      for (var s = 0; s < this.bears.length; s++)
        this.bears[s].tick(e),
          this.timeReal > 45 &&
            !this.bears[0].isFalling &&
            createHint(9, 8, this.bears[0], 0, -65, !1, 0, -30, !0);
      for (var s = 0; s < this.dogs.length; s++) this.dogs[s].tick(e);
      for (var s = 0; s < this.cats.length; s++) this.cats[s].tick(e);
      for (var s = 0; s < this.grass.length; s++) this.grass[s].tick(e);
      for (var s = 0; s < this.buildings.length; s++)
        this.buildings[s].tick(e),
          field.curLevel > 0 &&
            field.timeReal > 25 &&
            !this.buildings[0].isFalling &&
            createHint(18, 9, this.buildings[0], 100, 0, !1, 0, -5, !0),
          field.curLevel > 0 &&
            field.timeReal > 5 &&
            this.buildings[s].up.visible &&
            !this.buildings[s].isFalling &&
            createHint(20, 8, this.buildings[s], 0, -40, !1, 0, -25, !0);
      1 == field.curLevel &&
        field.timeReal > 5 &&
        this.places.length > 0 &&
        createHint(16, 2, this.places[0], 80, 60, !1, 5, -10, !0);
      for (var s = 0; s < this.products.length; s++) {
        this.products[s].tick(e);
        for (var t = 0; t < this.cats.length; t++) {
          var u = this.products[s].x - this.cats[t].x,
            g = this.products[s].y - this.cats[t].y,
            f = Math.sqrt(u * u + g * g);
          5 > f &&
            depot.realCapacity + this.products[s].DepotSize <= depot.capacity &&
            !this.products[s].onDepot &&
            this.products[s].moveToDepot();
        }
      }
      for (var s = 0; s < this.products.length; s++)
        this.products[s].onDepot && this.products.splice(s, 1);
      for (var s = 0; s < this.buildings.length; s++)
        this.buildings[s].toRemove && this.buildings.splice(s, 1);
      for (var s = 0; s < this.pets.length; s++)
        for (var t = 0; t < this.bears.length; t++) {
          var m = this.pets[s],
            y = this.bears[t];
          if (m && 10 != m.state && 0 != y.state && !y.isFalling) {
            var u = y.x - m.x,
              g = y.y + y.height / 2 - m.y - m.height / 2,
              f = Math.sqrt(u * u + g * g);
            10 > f &&
              ((field.noPetKillTimer = 1800),
              m.changeState(10),
              field.removePet());
          }
        }
    }
  }),
  (GameField.prototype.postTick = function () {}),
  Utils.extend(Bear, Animal),
  (Bear.prototype.appearShadow = function () {
    var e = this;
    (this.isFalling = !0),
      (this.fallingShadow = addSprite(
        !1,
        this.Shadow.Picture,
        this.x,
        this.y + 1280
      )),
      this.fallingShadow.gotoAndStop(this.up),
      this.fallingShadow.setPropScale(0.1),
      this.fallingShadow.scaleTo(1, 4e3 * this.FallingTime),
      this.moveTo(
        this.x,
        this.fallingShadow.y,
        4e3 * this.FallingTime,
        null,
        function () {
          e.landing();
        }
      );
  }),
  (Bear.prototype.buildCage = function (e) {
    field.pause ||
      ((field.withoutClick = !1),
      (field.withoutBearClick = !1),
      playSound("cage_click"),
      (e.target.cage.visible = !0),
      (e.target.Progress += e.target.BuildSpeed),
      e.target.Progress > e.target.ProgressMaxValue &&
        (e.target.Progress = e.target.ProgressMaxValue));
  }),
  (Bear.prototype.toDepot = function (e) {
    if (!field.pause && !this.isMoving) {
      if (
        ((field.withoutClick = !1),
        (field.withoutBearClick = !1),
        !(depot.realCapacity + this.DepotSize <= depot.capacity))
      )
        return depot.hintArrow(), !1;
      this.moveToDepot(e);
    }
  }),
  (Bear.prototype.moveToDepot = function () {
    gameData.prodCount++,
      saveGameData(gameData),
      this.curSound && this.curSound.stop(),
      playSound("product_landing"),
      (depot.realCapacity += this.DepotSize),
      (this.isMoving = !0),
      (this.releaseTimePass = 0),
      this.stop(),
      this.cage.stop(),
      this.scaleTo(0.2, 500),
      stage
        .createTween(this, "y", this.y, depot.y, 500, Easing.sine.easeIn)
        .play();
    var e = stage.createTween(this, "x", this.x, depot.x, 500);
    (e.onfinish = function (e) {
      depot.addProduct(e.target.obj),
        e.target.obj.dead(),
        (e.target.obj.onDepot = !0),
        (e.target.obj.destroy = !0);
    }),
      (e.onchange = function (e) {
        e.target.obj.rotation -= 0.2;
      }),
      e.play();
  }),
  (Bear.prototype.escape = function () {
    playSound("cage_broke_bear_flee"),
      (this.state = 0),
      (this.cage.destroy = !0),
      (this.onmouseup = function () {}),
      (this.scaleX = this.x < 240 ? 1 : -1);
    var e = library.items["pets/bears/bear" + (this.up + 1) + "_left"];
    (this.bitmap = e.bitmap),
      (this.width = e.width),
      (this.height = e.height),
      (this.layers = e.layers),
      (this.totalFrames = e.frames),
      (this.animDelay = 0.3),
      this.moveBy(-480 * this.scaleX, 0, 500, null, function (e) {
        e.target.obj.dead();
      });
  }),
  (Bear.prototype.dead = function () {
    (this.state = 10), field.removePet(), (this.destroy = !0);
  }),
  Utils.extend(Dog, Animal),
  (Dog.prototype.appearShadow = function () {
    var e = this;
    (this.isFalling = !0),
      (this.fallingShadow = addSprite(
        !1,
        this.Shadow.Picture,
        this.x,
        this.y + 320
      )),
      this.moveTo(
        this.x,
        this.fallingShadow.y,
        1e3 * this.FallingTime,
        null,
        function () {
          e.landing();
        }
      );
  }),
  Utils.extend(Cat, Animal),
  (Cat.prototype.appearShadow = function () {
    var e = this;
    (this.isFalling = !0),
      (this.fallingShadow = addSprite(
        !1,
        this.Shadow.Picture,
        this.x,
        this.y + 320
      )),
      this.moveTo(
        this.x,
        this.fallingShadow.y,
        1e3 * this.FallingTime,
        null,
        function () {
          e.landing();
        }
      );
  }),
  Utils.extend(Chicken, ProductionPet),
  Utils.extend(Pig, ProductionPet),
  Utils.extend(Cow, ProductionPet),
  Utils.extend(Ostrich, ProductionPet),
  Utils.extend(Grass, Sprite),
  (Grass.prototype.tick = function (e) {
    if (this.state != STATE_GROW) {
      var t = Math.floor((this.totalFrames * this.Value) / this.maxValue);
      0 > t && (t = 0),
        0 >= t && ((this.destroy = !0), (this.remove = !0)),
        this.gotoAndStop(t);
      for (var s = 0; s < field.grass.length; s++)
        field.grass[s].remove && field.grass.splice(s, 1);
    }
  }),
  Utils.extend(Production, Sprite),
  (Production.prototype.fall = function (e) {
    var t = this;
    this.setZIndex(1500),
      (this.parashute = addSprite(
        !1,
        "misc/parachute",
        0,
        -(this.height - 10),
        1,
        this
      )),
      (this.isFalling = !0),
      this.moveTo(this.x, this.y + (320 * e) / 10, 500 * e, null, function () {
        t.landing();
      });
  }),
  (Production.prototype.landing = function () {
    (this.parashute.destroy = !0),
      (this.isFalling = !1),
      this.setZIndex(this.y + this.height / 2);
  }),
  (Production.prototype.moveToDepot = function () {
    gameData.prodCount++,
      saveGameData(gameData),
      playSound("product_landing"),
      (depot.realCapacity += this.DepotSize),
      this.parashute.x &&
        ((this.parashute.destroy = !0),
        gameData.parashutes++,
        saveGameData(gameData)),
      (this.onDepot = !0),
      (this.isMoving = !0),
      stage
        .createTween(this, "y", this.y, depot.y, 500, Easing.sine.easeIn)
        .play();
    var e = stage.createTween(this, "x", this.x, depot.x, 500);
    (e.onfinish = function (e) {
      depot.addProduct(e.target.obj), (e.target.obj.destroy = !0);
    }),
      e.play();
  }),
  (Production.prototype.startWarning = function () {
    (this.warning = !0), this.fadeIn();
  }),
  (Production.prototype.fadeIn = function () {
    var e = this;
    this.fadeTo(0, 500, null, function () {
      e.fadeOut();
    });
  }),
  (Production.prototype.fadeOut = function () {
    var e = this;
    this.fadeTo(1, 500, null, function () {
      e.fadeIn();
    });
  }),
  (Production.prototype.tick = function (e) {
    this.isMoving && this.setZIndex(1e3 + this.y + this.height / 2),
      field.curLevel > 0 &&
        (this.isFalling ||
          this.isMoving ||
          ((this.timeToDeath += e),
          this.timeToDeath >= 8e3 && !this.warning && this.startWarning(),
          this.timeToDeath >= 11e3 &&
            (playSound("product_crack"),
            (this.onDepot = !0),
            (this.destroy = !0))));
  }),
  Utils.extend(Depot, Sprite),
  (Depot.prototype.fall = function (e) {
    var t = this;
    (this.isFalling = !0),
      this.moveBy(
        0,
        (320 * e) / 10,
        (e * this.FallingTime * 1e3) / 10,
        null,
        function () {
          t.landing();
        }
      );
  }),
  (Depot.prototype.landing = function () {
    (this.isFalling = !1),
      this.setZIndex(depot.y + depot.height / 2),
      effectDust(this, 0);
  }),
  (Depot.prototype.upgrade = function () {
    if (this.curUp < config.accessDepot) {
      this.curUp++,
        (this.name = this.Upgrades["Up" + this.curUp].Picture),
        (this.capacity = this.Upgrades["Up" + this.curUp].Capacity),
        (this.ceilSize = this.capacity / 40);
      var e = library.getAsset(this.name);
      (this.bitmap = e.bitmap),
        (this.width = e.width),
        (this.height = e.height),
        (this.framesCount = e.framesCount),
        (this.frames = e.frames),
        (this.layers = e.layers),
        (this.up.cost =
          config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
        (this.starUp.cost =
          config.Game.EndlessMode.OpeningCosts.Item[
            xmlNameToUp(this.xmlName)
          ].c[this.curUp].cost),
        field.endless && ((this.up.visible = !1), (this.starUp.visible = !0)),
        this.curUp == config.accessDepot &&
          ((this.up.visible = !1), (this.starUp.visible = !1)),
        this.numbers.write(this.up.cost),
        this.numbersStar.write(this.starUp.cost),
        (this.x = this.position[0] - 20),
        (this.y = this.position[1]),
        this.setZIndex(this.y + this.height / 2),
        (this.onmouseup = this.createMenu),
        this.reDraw();
    }
  }),
  (Depot.prototype.hintArrow = function () {
    (field.noHintArrow = !1),
      this.hint && (this.hint.destroy = !0),
      (this.hint = addSprite(!1, "misc/red_arrow", 30, -20, 1, this)),
      this.hint.fadeTo(0, 3e3, null, function (e) {
        e.target.obj.destroy = !0;
      }),
      createHint(19, 7, this, 0, -75, !1, 0, -25, !0);
  }),
  (Depot.prototype.createMenuAvia = function () {
    if (!field.pause) {
      field.setPause(), (this.menu = addSprite(!1, "avia/back_avia", 240, 160));
      var e = this.confAviaUI.Upgrades["Up" + field.bigAvia.curUp],
        t = addSprite(
          !1,
          e.Picture.Picture,
          e.Picture.position[0],
          e.Picture.position[1],
          1,
          this.menu
        );
      addSprite(!1, "avia/avia_menu", -120, 0, 1, this.menu);
      var t = addSprite(!1, e.BoxPlacePicture.Picture, -120, 55, 1, this.menu);
      t.setPropScale(1.5),
        (this.aviaBoxes = t),
        (this.buttonCancel = addSprite(
          !1,
          "buttons/button_no",
          150,
          120,
          1,
          this.menu
        )),
        this.buttonCancel.stop(),
        (this.buttonCancel.onmouseup = function (e) {
          return (
            hint.active && ((hint.destroy = !0), (hint = {})),
            playSound("ui_button_click"),
            setZeroFrame(e),
            (depot.menu.destroy = !0),
            field.unsetPause(),
            (depot.shelves = []),
            (depot.petShelves = []),
            (depot.boxes = []),
            !1
          );
        }),
        (this.buttonCancel.onmouseout = setZeroFrame),
        (this.buttonCancel.onmousedown = function (e) {
          return setFirstFrame(e), !1;
        }),
        (this.buttonOk = addSprite(
          !1,
          "buttons/button_ok",
          60,
          120,
          1,
          this.menu
        )),
        this.buttonOk.gotoAndStop(2),
        (this.carLen = 0);
      for (var s = 1; 8 > s; s++) e.ProductPlaces["p" + s] && this.carLen++;
      textFutura(
        -120,
        -120,
        I18.f("goods_shipment"),
        13,
        this.menu,
        2,
        null,
        "#FFFF00",
        "#FFFF00"
      ),
        textFutura(
          -180,
          -93,
          I18.f("goods_products"),
          12,
          this.menu,
          2,
          null,
          "#FFFF00",
          "#FFFF00"
        ),
        textFutura(
          -125,
          -93,
          I18.f("goods_price"),
          12,
          this.menu,
          2,
          null,
          "#FFFF00",
          "#FFFF00"
        ),
        textFutura(
          -70,
          -93,
          I18.f("goods_ship"),
          12,
          this.menu,
          2,
          null,
          "#FFFF00",
          "#FFFF00"
        ),
        (this.totalCost = numbersGold(this.debt, -120, 90, 1.2, this.menu)),
        this.drawAviaProducts();
    }
  }),
  (Depot.prototype.createMenu = function () {
    if (!field.pause && field.action == ACTION_NONE) {
      field.setPause(),
        (this.menu = addSprite(!1, "depot/new_depot_back", 240, 175));
      var e = this.confUI.Upgrades["Up" + field.bigCar.curUp];
      (this.car = addSprite(
        !1,
        e.Picture.Picture,
        e.Picture.position[0],
        e.Picture.position[1],
        1,
        this.menu
      )),
        (this.buttonCancel = addSprite(
          !1,
          "buttons/button_no",
          190,
          100,
          1,
          this.menu
        )),
        this.buttonCancel.stop(),
        (this.buttonCancel.onmouseup = function (e) {
          hint.active && ((hint.destroy = !0), (hint = {})),
            playSound("ui_button_click"),
            setZeroFrame(e),
            (depot.menu.destroy = !0),
            field.unsetPause(),
            (depot.shelves = []),
            (depot.petShelves = []),
            (depot.boxes = []);
          for (var t = 0; 25 > t; t++) depot.p[t] += depot.c[t];
          for (var t = 25; 29 > t; t++) field.petsNum[t - 25] += depot.c[t];
          for (var t = 0; 29 > t; t++) depot.c[t] = 0;
          return !1;
        }),
        (this.buttonCancel.onmouseout = setZeroFrame),
        (this.buttonCancel.onmousedown = function (e) {
          return setFirstFrame(e), !1;
        }),
        (this.buttonOk = addSprite(
          !1,
          "buttons/button_ok",
          100,
          100,
          1,
          this.menu
        )),
        this.buttonOk.gotoAndStop(2),
        (this.carLen = 0);
      for (var t = 1; 8 > t; t++) e.ProductPlaces["p" + t] && this.carLen++;
      textFutura(
        -182,
        -115,
        I18.f("goods_products"),
        13,
        this.menu,
        2,
        null,
        "#FFFF00",
        "#FFFF00"
      ),
        textFutura(
          -115,
          -115,
          I18.f("goods_price"),
          13,
          this.menu,
          2,
          null,
          "#FFFF00",
          "#FFFF00"
        ),
        textFutura(
          -50,
          -115,
          I18.f("goods_ship"),
          13,
          this.menu,
          2,
          null,
          "#FFFF00",
          "#FFFF00"
        ),
        (this.totalCost = numbersGold(this.profit, 130, 25, 1.2, this.menu)),
        (this.buttonProducts = addSprite(
          !1,
          "depot/new_depot_header",
          -120,
          -156,
          1,
          this.menu
        )),
        this.buttonProducts.gotoAndStop(0),
        textFutura(0, 0, I18.f("goods_products"), 16, this.buttonProducts, 2),
        (this.buttonProducts.onmouseup = function (e) {
          playSound("ui_button_click"),
            (depot.marketPetMode = !1),
            depot.drawMenuProducts(),
            setZeroFrame(e),
            depot.buttonPets.gotoAndStop(1);
        }),
        (this.buttonPets = addSprite(
          !1,
          "depot/new_depot_header",
          120,
          -156,
          1,
          this.menu
        )),
        this.buttonPets.gotoAndStop(1),
        textFutura(0, 0, I18.f("goods_animals"), 16, this.buttonPets, 2),
        (this.buttonPets.onmouseup = function (e) {
          playSound("ui_button_click"),
            (depot.marketPetMode = !0),
            depot.drawMenuProducts(),
            setZeroFrame(e),
            depot.buttonProducts.gotoAndStop(1);
        }),
        (this.marketPetMode = !1),
        this.drawMenuProducts();
    }
  }),
  (Depot.prototype.drawAviaProducts = function () {
    if (field.endless) t = [16, 17, 18, 19, 20];
    else {
      var e = config.LevelsRecords.record[field.curLevel].AccessProduct,
        t = [];
      if (e.c)
        if (e.c.length)
          for (var s = 0; s < e.c.length; s++) t.push(e.c[s].Product);
        else t.push(e.c.Product);
    }
    if (this.shelves.length > 0)
      for (var s = 0; s < this.shelves.length; s++)
        this.shelves[s].destroy = !0;
    this.debt = 0;
    var i = !1;
    this.boxes.length > 0 && (i = !0);
    for (var s = 0; s < this.boxes.length; s++) {
      var a = this.boxes[s].id,
        r = this.boxes[s].num,
        o = config[productNameToXmlName(a)].Cost;
      this.debt += o * r;
    }
    this.totalCost.write(this.debt), (this.shelves = []);
    for (var s = 0; s < t.length; s++) {
      var o = config[productNameToXmlName(t[s])].Cost;
      if (o <= money - this.debt) {
        var e = this.confUI.ProductBoxes["p" + t[s]],
          n = addSprite(
            !1,
            e.texture_pressed,
            -180,
            -73 + 23 * s,
            1,
            this.menu
          );
        numbersDepot(o, 60, 0, 1, n, 1),
          addSprite(!1, "depot/depot_menu_coin1", 35, 0, 1, n);
        var h = addSprite(!1, "buttons/button_3", 83, 0, 1, n);
        if (
          (h.stop(),
          (h.id = t[s]),
          (h.onmouseup = function (e) {
            return setZeroFrame(e), depot.addAviaBox(e.target.id, 1), !1;
          }),
          (h.onmouseout = setZeroFrame),
          (h.onmousedown = setFirstFrame),
          numbersDepot(1, 0, 0, 1, h),
          5 * o <= money - this.debt)
        ) {
          var h = addSprite(!1, "buttons/button_3", 125, 0, 1, n);
          h.stop(),
            (h.id = t[s]),
            (h.count = this.p[t[s]]),
            (h.onmouseup = function (e) {
              return setZeroFrame(e), depot.addAviaBox(e.target.id, 5), !1;
            }),
            (h.onmouseout = setZeroFrame),
            (h.onmousedown = setFirstFrame),
            numbersDepot(5, 0, 0, 1, h);
        }
        this.shelves.push(n);
      }
    }
    i
      ? (depot.buttonOk.gotoAndStop(0),
        (depot.buttonOk.onmouseout = setZeroFrame),
        (depot.buttonOk.onmousedown = function (e) {
          return setFirstFrame(e), !1;
        }),
        (depot.buttonOk.onmouseup = depot.aviaToMarket))
      : (depot.buttonOk.gotoAndStop(2),
        (depot.buttonOk.onmouseout = function () {}),
        (depot.buttonOk.onmousedown = function () {
          return !1;
        }),
        (depot.buttonOk.onmouseup = function () {}));
  }),
  (Depot.prototype.drawMenuProducts = function () {
    for (var e = [], t = 0; t < this.p.length; t++) this.p[t] > 0 && e.push(t);
    if (this.shelves.length > 0)
      for (var t = 0; t < this.shelves.length; t++)
        this.shelves[t].destroy = !0;
    if (this.petShelves.length > 0)
      for (var t = 0; t < this.petShelves.length; t++)
        this.petShelves[t].destroy = !0;
    if (this.marketPetMode) {
      this.petShelves = [];
      for (var s = 0, t = 0; t < field.petsNum.length; t++)
        if (field.petsNum[t] > 0) {
          var i = this.confUI.PetBoxes["p" + t],
            a = addSprite(
              !1,
              i.texture_pressed,
              -195,
              -85 + 23 * s,
              1,
              this.menu
            );
          s++,
            addSprite(!1, "depot/depot_menu_x", 15, 0, 1, a),
            numbersDepot(field.petsNum[t], 27, 0, 1, a),
            numbersDepot(petCost(t), 85, 0, 1, a, 1),
            addSprite(!1, "depot/depot_menu_coin1", 90, 0, 1, a);
          var r = addSprite(!1, "buttons/button_3", 120, 0, 1, a);
          r.stop(),
            (r.id = 25 + t),
            (r.onmouseup = function (e) {
              return setZeroFrame(e), depot.addBox(e.target.id, 1), !1;
            }),
            (r.onmouseout = setZeroFrame),
            (r.onmousedown = setFirstFrame),
            numbersDepot(1, 0, 0, 1, r);
          var r = addSprite(!1, "buttons/button_4", 165, 0, 1, a);
          r.stop(),
            (r.id = 25 + t),
            (r.count = field.petsNum[t]),
            (r.onmouseup = function (e) {
              return (
                setZeroFrame(e), depot.addBox(e.target.id, e.target.count), !1
              );
            }),
            (r.onmouseout = setZeroFrame),
            (r.onmousedown = setFirstFrame),
            textFutura(0, -2, I18.f("goods_all"), 12, r, 2),
            this.petShelves.push(a);
        }
    } else {
      this.shelves = [];
      for (var o = e.length <= 9 ? e.length : 9, t = 0; o > t; t++) {
        var i = this.confUI.ProductBoxes["p" + e[t]],
          a = addSprite(
            !1,
            i.texture_pressed,
            -195,
            -85 + 23 * t,
            1,
            this.menu
          );
        addSprite(!1, "depot/depot_menu_x", 15, 0, 1, a),
          numbersDepot(this.p[e[t]], 27, 0, 1, a);
        var n = config[productNameToXmlName(e[t])].Cost;
        numbersDepot(n, 85, 0, 1, a, 1),
          addSprite(!1, "depot/depot_menu_coin1", 90, 0, 1, a);
        var r = addSprite(!1, "buttons/button_3", 120, 0, 1, a);
        r.stop(),
          (r.id = e[t]),
          (r.onmouseup = function (e) {
            return setZeroFrame(e), depot.addBox(e.target.id, 1), !1;
          }),
          (r.onmouseout = setZeroFrame),
          (r.onmousedown = setFirstFrame),
          numbersDepot(1, 0, 0, 1, r),
          createHint(11, 2, r, 120, 135, !0, 5, -10, !1);
        var r = addSprite(!1, "buttons/button_4", 165, 0, 1, a);
        r.stop(),
          (r.id = e[t]),
          (r.count = this.p[e[t]]),
          (r.onmouseup = function (e) {
            return (
              setZeroFrame(e), depot.addBox(e.target.id, e.target.count), !1
            );
          }),
          (r.onmouseout = setZeroFrame),
          (r.onmousedown = setFirstFrame),
          textFutura(0, -2, I18.f("goods_all"), 12, r, 2),
          createHint(12, 2, r, 120, 135, !0, 5, -10, !1),
          this.shelves.push(a);
      }
    }
    this.profit = 0;
    for (var h = !1, t = 0; t < this.c.length; t++)
      this.c[t] > 0 &&
        (25 > t
          ? (this.profit += this.c[t] * config[productNameToXmlName(t)].Cost)
          : (this.profit += this.c[t] * petCost(t - 25)),
        (h = !0));
    this.totalCost.write(this.profit),
      h
        ? (depot.buttonOk.gotoAndStop(0),
          (depot.buttonOk.onmouseout = setZeroFrame),
          (depot.buttonOk.onmousedown = function (e) {
            return setFirstFrame(e), !1;
          }),
          (depot.buttonOk.onmouseup = depot.carToMarket))
        : (depot.buttonOk.gotoAndStop(2),
          (depot.buttonOk.onmouseout = function () {}),
          (depot.buttonOk.onmousedown = function () {
            return !1;
          }),
          (depot.buttonOk.onmouseup = function () {}));
  }),
  (Depot.prototype.aviaToMarket = function (e) {
    return (
      hint.active && ((hint.destroy = !0), (hint = {})),
      playSound("airplane_flyin"),
      addMoney(-depot.debt),
      (depot.menu.destroy = !0),
      field.unsetPause(),
      (depot.booking = depot.boxes),
      (depot.shelves = []),
      (depot.boxes = []),
      console.log(depot.booking),
      field.addAvia(depot.debt),
      (depot.debt = 0),
      !1
    );
  }),
  (Depot.prototype.carToMarket = function (e) {
    hint.active && ((hint.destroy = !0), (hint = {})),
      (depot.menu.destroy = !0),
      field.unsetPause(),
      (depot.shelves = []),
      (depot.petShelves = []),
      (depot.boxes = []),
      depot.reDraw();
    for (var t = 25; t < depot.c.length; t++)
      if (depot.c[t] > 0)
        for (var s = depot.c[t], i = t - 25, a = 0; a < field.pets.length; a++)
          field.pets[a].id == i &&
            s > 0 &&
            ((field.pets[a].destroy = !0), field.pets.splice(a, 1), a--, s--);
    field.addCar(depot.profit), (depot.profit = 0);
    for (var t = 0; t < depot.c.length; t++) depot.c[t] = 0;
    return !1;
  }),
  (Depot.prototype.addAviaBox = function (e, t) {
    function s() {
      depot.drawAviaProducts();
    }
    function i(e) {
      playSound("item_cancel"), (e.target.destroy = !0);
      for (var t, s = 0; s < depot.boxes.length; s++)
        e.target.x == depot.boxes[s].x &&
          e.target.y == depot.boxes[s].y &&
          (t = s);
      depot.boxes.splice(t, 1);
      for (var s = 0; s < depot.boxes.length; s++) {
        var i = o.ProductPlaces["p" + (s + 1)]["p" + (s + 1)];
        (depot.boxes[s].x = i[0]), (depot.boxes[s].y = i[1]);
      }
      depot.drawAviaProducts();
    }
    function a() {
      var a = depot.boxes.length + 1,
        n = o.ProductPlaces["p" + a]["p" + a],
        h = addSprite(!1, r.Picture, n[0], n[1], 0.9, depot.aviaBoxes);
      if (
        ((h.indicator = addSprite(!1, r.CountProgress.Picture, 8, 0, 1, h)),
        (h.indicator.scaleY = 0.7),
        h.indicator.stop(),
        (h.id = e),
        (h.capacity = r.Capacity),
        (h.onmouseup = i),
        !(t <= r.Capacity))
      ) {
        h.num = r.Capacity;
        var a = Math.floor(
          h.indicator.totalFrames -
            h.indicator.totalFrames * (h.num / h.capacity)
        );
        return (
          h.indicator.gotoAndStop(a),
          depot.boxes.push(h),
          depot.addAviaBox(e, t - r.Capacity),
          void depot.drawAviaProducts()
        );
      }
      h.num = t;
      var a = Math.floor(
        h.indicator.totalFrames - h.indicator.totalFrames * (h.num / h.capacity)
      );
      h.indicator.gotoAndStop(a), depot.boxes.push(h), s();
    }
    playSound("item_add");
    var r = this.confUI.ProductBoxes["p" + e],
      o = this.confAviaUI.Upgrades["Up" + field.bigAvia.curUp],
      n = 0,
      h = 0,
      l = 0;
    if (this.boxes.length > 0)
      for (var p = 0; p < this.carLen; p++)
        this.boxes[p] &&
          this.boxes[p].id == e &&
          (n++, (h += this.boxes[p].num), (l = p));
    if (0 == n) {
      if (!(this.boxes.length < this.carLen)) return;
      a();
    } else if (this.boxes.length < this.carLen)
      if (this.boxes[l].capacity * n == h) a();
      else if (this.boxes[l].num + t <= this.boxes[l].capacity) {
        this.boxes[l].num += t;
        var d = Math.floor(
          this.boxes[l].indicator.totalFrames -
            this.boxes[l].indicator.totalFrames *
              (this.boxes[l].num / this.boxes[l].capacity)
        );
        this.boxes[l].indicator.gotoAndStop(d), s();
      } else {
        var c = this.boxes[l].capacity - this.boxes[l].num;
        (t -= c), (this.boxes[l].num = this.boxes[l].capacity);
        var d = Math.floor(
          this.boxes[l].indicator.totalFrames -
            this.boxes[l].indicator.totalFrames *
              (this.boxes[l].num / this.boxes[l].capacity)
        );
        this.boxes[l].indicator.gotoAndStop(d), a();
      }
    else {
      if (!(h < n * this.boxes[l].capacity)) return;
      if (this.boxes[l].num + t <= this.boxes[l].capacity)
        this.boxes[l].num += t;
      else {
        var c = this.boxes[l].capacity - this.boxes[l].num;
        (t -= c), (this.boxes[l].num = this.boxes[l].capacity);
      }
      var d = Math.floor(
        this.boxes[l].indicator.totalFrames -
          this.boxes[l].indicator.totalFrames *
            (this.boxes[l].num / this.boxes[l].capacity)
      );
      this.boxes[l].indicator.gotoAndStop(d), s();
    }
  }),
  (Depot.prototype.addBox = function (e, t) {
    function s() {
      depot.drawMenuProducts();
    }
    function i(e) {
      playSound("item_cancel"), (e.target.destroy = !0);
      for (var t, s = 0; s < depot.boxes.length; s++)
        e.target.x == depot.boxes[s].x &&
          e.target.y == depot.boxes[s].y &&
          (t = s);
      (depot.c[e.target.id] -= e.target.num),
        console.log(e.target.id),
        e.target.id < 25
          ? (depot.p[e.target.id] += e.target.num)
          : (field.petsNum[e.target.id - 25] += e.target.num),
        depot.boxes.splice(t, 1);
      for (var s = 0; s < depot.boxes.length; s++) {
        var i = o.ProductPlaces["p" + (s + 1)]["p" + (s + 1)];
        (depot.boxes[s].x = i[0]), (depot.boxes[s].y = i[1]);
      }
      depot.drawMenuProducts();
    }
    function a() {
      var a = depot.boxes.length + 1,
        n = o.ProductPlaces["p" + a]["p" + a],
        h = addSprite(!1, r.Picture, n[0], n[1], 0.9, depot.car);
      if (
        (h.setPropScale(1.5),
        (h.indicator = addSprite(!1, r.CountProgress.Picture, 8, 0, 1, h)),
        (h.indicator.scaleY = 0.7),
        h.indicator.stop(),
        (h.id = e),
        (h.capacity = r.Capacity),
        (h.onmouseup = i),
        !(t <= r.Capacity))
      ) {
        (depot.c[e] += r.Capacity),
          (h.num = r.Capacity),
          25 > e
            ? (depot.p[e] -= r.Capacity)
            : (field.petsNum[e - 25] -= r.Capacity);
        var a = Math.floor(
          h.indicator.totalFrames -
            h.indicator.totalFrames * (h.num / h.capacity)
        );
        return (
          h.indicator.gotoAndStop(a),
          depot.boxes.push(h),
          depot.addBox(e, t - r.Capacity),
          void depot.drawMenuProducts()
        );
      }
      (t > depot.p[e] && 25 > e) || (t > field.petsNum[e - 25] && e >= 25)
        ? 25 > e
          ? ((depot.c[e] += depot.p[e]), (h.num = depot.p[e]), (depot.p[e] = 0))
          : ((depot.c[e] += field.petsNum[e - 25]),
            (h.num = field.petsNum[e - 25]),
            (field.petsNum[e - 25] = 0))
        : (25 > e ? (depot.p[e] -= t) : (field.petsNum[e - 25] -= t),
          (h.num = t),
          (depot.c[e] += t));
      var a = Math.floor(
        h.indicator.totalFrames - h.indicator.totalFrames * (h.num / h.capacity)
      );
      h.indicator.gotoAndStop(a), depot.boxes.push(h), s();
    }
    playSound("item_add");
    var r =
        25 > e
          ? this.confUI.ProductBoxes["p" + e]
          : this.confUI.PetBoxes["p" + (e - 25)],
      o = this.confUI.Upgrades["Up" + field.bigCar.curUp],
      n = 0,
      h = 0,
      l = 0;
    if (this.boxes.length > 0)
      for (var p = 0; p < this.carLen; p++)
        this.boxes[p] &&
          this.boxes[p].id == e &&
          (n++, (h += this.boxes[p].num), (l = p));
    if (0 == n) {
      if (!(this.boxes.length < this.carLen)) return;
      a();
    } else if (this.boxes.length < this.carLen)
      if (this.boxes[l].capacity * n == h) a();
      else if (this.boxes[l].num + t <= this.boxes[l].capacity) {
        (this.boxes[l].num += t),
          25 > e ? (this.p[e] -= t) : (field.petsNum[e - 25] -= t),
          (this.c[e] += t);
        var d = Math.floor(
          this.boxes[l].indicator.totalFrames -
            this.boxes[l].indicator.totalFrames *
              (this.boxes[l].num / this.boxes[l].capacity)
        );
        this.boxes[l].indicator.gotoAndStop(d), s();
      } else {
        var c = this.boxes[l].capacity - this.boxes[l].num;
        (t -= c),
          (this.boxes[l].num = this.boxes[l].capacity),
          25 > e ? (this.p[e] -= c) : (field.petsNum[e - 25] -= c),
          (this.c[e] += c);
        var d = Math.floor(
          this.boxes[l].indicator.totalFrames -
            this.boxes[l].indicator.totalFrames *
              (this.boxes[l].num / this.boxes[l].capacity)
        );
        this.boxes[l].indicator.gotoAndStop(d), a();
      }
    else {
      if (!(h < n * this.boxes[l].capacity)) return;
      if (this.boxes[l].num + t <= this.boxes[l].capacity)
        (this.boxes[l].num += t),
          25 > e ? (this.p[e] -= t) : (field.petsNum[e - 25] -= t),
          (this.c[e] += t);
      else {
        var c = this.boxes[l].capacity - this.boxes[l].num;
        (t -= c),
          (this.boxes[l].num = this.boxes[l].capacity),
          25 > e ? (this.p[e] -= c) : (field.petsNum[e - 25] -= c),
          (this.c[e] += c);
      }
      var d = Math.floor(
        this.boxes[l].indicator.totalFrames -
          this.boxes[l].indicator.totalFrames *
            (this.boxes[l].num / this.boxes[l].capacity)
      );
      this.boxes[l].indicator.gotoAndStop(d), s();
    }
  }),
  (Depot.prototype.addProduct = function (e) {
    for (var t = "products_mini/mini_" + e.type, s = 0; 25 > s; s++)
      t == this.Productions["p" + (s + 1)].Picture &&
        (this.p[s]++, (this.w[s] += e.DepotSize));
    if (field[e.type] > 0) {
      field[e.type]--;
      for (var s = 0; s < field.toGoals.length; s++)
        if (
          field.toGoals[s][e.type] &&
          (field.toGoals[s].valueText.write(
            field.toGoals[s].max - field[e.type]
          ),
          (field.toGoals[s].value = field.toGoals[s].max - field[e.type]),
          0 == field[e.type])
        )
          if (
            (playSound("fanfare_aim"),
            (field.toGoals[s].destroy = !0),
            field.endless)
          )
            addEndlessStars(field.toGoals[s].endlessStars),
              field.addEndlessGoal(s);
          else {
            var i = addSprite(
              !1,
              field.toGoals[s].name,
              field.toGoals[s].x,
              field.toGoals[s].y,
              0.8
            );
            i.setZIndex(5e3),
              addSprite(!1, "ui_level/goal_done", 0, 20, 0.8, i);
          }
    }
    this.reDraw();
  }),
  (Depot.prototype.reDraw = function () {
    for (var e = [], t = 0; 25 > t; t++)
      if (0 != this.p[t]) {
        var s = Math.floor(this.w[t] / this.ceilSize + 0.5);
        1 > s && (s = 1);
        for (var i = 0; s > i; i++) e.push(t);
      }
    for (var a, r, o, t = 0; t < this.productsArray.length; t++)
      this.productsArray[t].destroy = !0;
    this.productsArray = [];
    for (var t = 0; t < e.length && 40 != t; t++)
      (a = 9 > t ? "p0" + (t + 1) : "p" + (t + 1)),
        (r = this.Productions["p" + (e[t] + 1)].Picture),
        (o = addSprite(
          !1,
          r,
          0.5 * this.ProductPlaces[a][a][0],
          0.5 * this.ProductPlaces[a][a][1] - 3,
          1,
          this
        )),
        this.productsArray.push(o);
    this.realCapacity = 0;
    for (var t = 0; t < this.p.length; t++) this.w[t] = 0;
    for (var t = 0; t < this.p.length; t++)
      this.p[t] > 0 &&
        ((this.w[t] += this.p[t] * config[productNameToXmlName(t)].DepotSize),
        (this.realCapacity +=
          this.p[t] * config[productNameToXmlName(t)].DepotSize));
  }),
  (Depot.prototype.checkProduct = function (e, t) {
    for (var s = [], i = 0; i < e.length; i++)
      for (var a = "products_mini/mini_" + e[i], r = 0; 25 > r; r++)
        if (a == this.Productions["p" + (r + 1)].Picture) {
          s.push(r);
          break;
        }
    if (s.length == e.length) {
      for (var o = t, r = 0; r < s.length; r++)
        for (var i = 0; 25 > i; i++)
          if (i == s[r]) {
            if (0 == this.p[i]) return !1;
            this.p[i] < o && (o = this.p[i]);
          }
      for (var r = 0; r < s.length; r++)
        for (var i = 0; 25 > i; i++)
          i == s[r] &&
            ((this.realCapacity -= (o * this.w[i]) / this.p[i]),
            (this.w[i] -= (o * this.w[i]) / this.p[i]),
            (this.p[i] -= o));
      return this.reDraw(), o;
    }
  }),
  Utils.extend(House, TilesSprite),
  (House.prototype.fall = function (e) {
    var t = this;
    (this.isFalling = !0),
      this.moveBy(
        0,
        (320 * e) / 10,
        (e * this.FallingTime * 1e3) / 10,
        null,
        function () {
          t.landing();
        }
      );
  }),
  (House.prototype.landing = function () {
    if ((playSound("house_landing"), (this.isFalling = !1), !this.isStart)) {
      for (var e = 0; e < field.places.length; e++)
        this.groundType == field.places[e].groundType &&
          ((field.places[e].destroy = !0), field.places.splice(e, 1), e--);
      for (var e = 0; e < field.buildings.length; e++)
        this.groundType == field.buildings[e].groundType &&
          field.buildings[e].xmlName != this.xmlName &&
          ((field.buildings[e].destroy = !0),
          field.buildings.splice(e, 1),
          e--);
      2 == field.grounds[this.groundType].length &&
        (field.grounds[this.groundType][0].Type == xmlNameToUp(this.xmlName) - 4
          ? field.addPlace(
              houseCodeToXmlName(field.grounds[this.groundType][1].Type),
              this.groundType,
              3
            )
          : field.addPlace(
              houseCodeToXmlName(field.grounds[this.groundType][0].Type),
              this.groundType,
              3
            ));
    }
    this.setZIndex(this.y + this.height / 2),
      (this.bottom = this.y + this.height / 2),
      effectDust(this, 0),
      "DriedEggsHouse" == this.xmlName &&
        createHint(17, 9, this, 100, 0, !1, 5, -10, !0),
      "CakeHouse" == this.xmlName &&
        createHint(21, 8, this, 0, -75, !1, 5, -10, !0),
      "ButterHouse" == this.xmlName &&
        createHint(25, 7, this, 0, -60, !1, 5, -10, !0),
      "CheeseHouse" == this.xmlName &&
        createHint(28, 7, this, 0, -60, !1, 5, -10, !0);
  }),
  (House.prototype.upgrade = function () {
    if (this.curUp < config["access" + this.xmlName]) {
      this.curUp++, (this.name = this.Upgrades["Up" + this.curUp].Picture);
      var e = library.getAsset(this.name);
      (this.bitmap = e.bitmap),
        (this.width = e.width),
        (this.height = e.height),
        (this.framesCount = e.framesCount),
        (this.totalFrames = e.frames),
        (this.layers = e.layers),
        (this.productionNumber =
          this.Upgrades["Up" + this.curUp].ProductionNum),
        (this.productionTime =
          1e3 * this.Upgrades["Up" + this.curUp].MaxProductionTime),
        (this.deltaTimePart =
          this.Upgrades["Up" + this.curUp].Overload.DeltaTimePart),
        (this.clicksNum = this.Upgrades["Up" + this.curUp].Overload.ClicksNum),
        (this.overloadClick =
          (this.deltaTimePart * this.productionTime) / this.clicksNum),
        (this.recoverySpeed =
          this.Upgrades["Up" + this.curUp].Overload.RecoverySpeed),
        (this.overloadMax =
          this.Upgrades["Up" + this.curUp].Overload.ClicksNumMax),
        (this.overload = this.overloadMax),
        (this.up.cost =
          config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
        (this.up.y = this.height / 2 - 20),
        (this.indicator.y = this.height / 2 - 40),
        (this.starUp.cost =
          config.Game.EndlessMode.OpeningCosts.Item[
            xmlNameToUp(this.xmlName)
          ].c[this.curUp].cost),
        (this.starUp.y = this.height / 2 - 20),
        this.numbers.write(this.up.cost),
        this.numbersStar.write(this.starUp.cost),
        field.endless && ((this.up.visible = !1), (this.starUp.visible = !0)),
        this.curUp == config["access" + this.xmlName] - 1 &&
          ((this.up.visible = !1), (this.starUp.visible = !1)),
        (this.y = this.bottom - this.height / 2);
    }
  }),
  (House.prototype.overloadProduction = function () {
    (this.time += this.overloadClick),
      this.overload--,
      (this.overloadLine.height = Math.floor(
        (this.overloadHeight * this.overload) / this.overloadMax
      )),
      (this.overloadLine.y =
        this.overloadY -
        this.overloadLine.height / 2 +
        this.overloadHeight / 2),
      this.overload <= 0 && this.remove();
  }),
  (House.prototype.remove = function () {
    function e(e, t, s, i) {
      var a = stage.createTween(e, "x", e.x, (e.x + t) / 2, 400);
      (a.onchange = function (e) {
        e.target.obj.rotation += (Math.PI / 180) * i;
      }),
        a.play();
      var r = stage.createTween(
        e,
        "y",
        e.y,
        (e.y + s) / 2 - 40,
        400,
        Easing.sine.easeOut
      );
      (r.onfinish = function () {
        var a = stage.createTween(e, "x", e.x, t, 400);
        (a.onchange = function (e) {
          e.target.obj.rotation += (Math.PI / 180) * i;
        }),
          a.play();
        var r = stage.createTween(e, "y", e.y, s, 400, Easing.sine.easeIn);
        (r.onfinish = function (e) {
          e.target.obj.destroy = !0;
        }),
          r.play();
      }),
        r.play();
    }
    (field.noHouseDestroyTimer = 3600),
      gameData.destroyedHouses++,
      saveGameData(gameData),
      playSound("house_crash"),
      (this.toRemove = !0),
      (this.destroy = !0);
    for (
      var t = [],
        s = this.height / 6,
        i = this.width / 9,
        a = this.y - this.height / 2,
        r = this.x - this.width / 2,
        o = 0;
      5 > o;
      o++
    )
      for (var n = 0; 8 > n; n++) {
        var h = addSprite(
          !1,
          this.name,
          r + (i / 2) * (n + 1),
          a + (s / 2) * (2 * o + 1)
        );
        h.stop(),
          (h.height = s),
          (h.width = i),
          (h.offset.left = (i / 2) * (n + 1)),
          (h.offset.top = (s / 2) * (2 * o + 1)),
          t.push(h);
      }
    for (var o = 0; o < t.length; o++) {
      var l = random(-50, 50),
        p = random(0, 50),
        d = random(1, 5);
      e(t[o], this.x + l, this.y + p, d);
    }
  }),
  (House.prototype.checkDepot = function () {
    var e = [];
    if (this.ProductTake.Product instanceof Array)
      for (var t = 0; t < this.ProductTake.Product.length; t++)
        e.push(this.ProductTake.Product[t].Type);
    else e.push(this.ProductTake.Product.Type);
    var s = depot.checkProduct(e, this.productionNumber);
    if (s) {
      (this.onBusy = !0), (this.returnedProductsNum = s);
      for (var i = 0; s > i; i++)
        for (var t = 0; t < e.length; t++) {
          var a = productNameToXmlName(e[t]),
            r = field.addProduction(a, depot.x, depot.y);
          if (((r.isMoving = !0), t == e.length - 1 && i == s - 1)) {
            stage
              .createTween(
                r,
                "y",
                r.y,
                this.y,
                500 + 200 * (t + i * e.length),
                Easing.sine.easeIn
              )
              .play();
            var o = stage.createTween(
              r,
              "x",
              r.x,
              this.x,
              500 + 200 * (t + i * e.length)
            );
            (o.onfinish = function (e) {
              for (var t = 0; t < field.buildings.length; t++)
                e.target.obj.x <=
                  field.buildings[t].x + field.buildings[t].width / 2 &&
                  e.target.obj.x >=
                    field.buildings[t].x - field.buildings[t].width / 2 &&
                  e.target.obj.y <=
                    field.buildings[t].y + field.buildings[t].height / 2 &&
                  e.target.obj.y >=
                    field.buildings[t].y - field.buildings[t].height / 2 &&
                  field.buildings[t].startProduction();
              (e.target.obj.onDepot = !0), (e.target.obj.destroy = !0);
            }),
              o.play();
          } else {
            stage
              .createTween(
                r,
                "y",
                r.y,
                this.y,
                500 + 200 * (t + i * e.length),
                Easing.sine.easeIn
              )
              .play();
            var o = stage.createTween(
              r,
              "x",
              r.x,
              this.x,
              500 + 200 * (t + i * e.length)
            );
            (o.onfinish = function (e) {
              (e.target.obj.onDepot = !0), (e.target.obj.destroy = !0);
            }),
              o.play();
          }
        }
    }
  }),
  (House.prototype.startProduction = function () {
    (this.onProduction = !0), this.play();
  }),
  (House.prototype.produce = function () {
    for (
      var e = productNameToXmlName(this.ProductReturn.Product.Type), t = 0;
      t < this.returnedProductsNum;
      t++
    ) {
      var s = random(10, 20),
        i = random(-10, 5);
      this.x < 240
        ? field.addProduction(e, this.x + 4.8 * s, this.y + 2.5 * i)
        : field.addProduction(e, this.x - 4.8 * s, this.y + 2.5 * i);
    }
  }),
  (House.prototype.tick = function (e) {
    if (!this.onProduction)
      return void (
        this.overload < this.overloadMax &&
        ((this.overload += (this.recoverySpeed * e) / 1e3),
        this.overload >= this.overloadMax && (this.overload = this.overloadMax),
        (this.overloadLine.height = Math.floor(
          (this.overloadHeight * this.overload) / this.overloadMax
        )),
        (this.overloadLine.y =
          this.overloadY -
          this.overloadLine.height / 2 +
          this.overloadHeight / 2))
      );
    (this.time += e),
      this.time >= this.productionTime &&
        (this.produce(),
        this.gotoAndStop(0),
        (this.onBusy = !1),
        (this.onProduction = !1),
        (this.returnedProductsNum = 1),
        (this.time = 0));
    var t = Math.floor(
      this.indicator.totalFrames * (this.time / this.productionTime)
    );
    this.indicator.gotoAndStop(t);
  }),
  Utils.extend(HousePlace, Sprite),
  (HousePlace.prototype.fall = function (e) {
    var t = this;
    (this.isFalling = !0),
      this.moveBy(
        0,
        (320 * e) / 10,
        (e * this.FallingTime * 1e3) / 10,
        null,
        function () {
          t.landing();
        }
      );
  }),
  (HousePlace.prototype.landing = function () {
    playSound("house_board_landing"),
      (this.isFalling = !1),
      this.setZIndex(depot.y + depot.height / 2),
      effectDust(this, 1);
  }),
  Utils.extend(Well, TilesSprite),
  (Well.prototype.hintArrow = function () {
    (field.noHintArrow = !1),
      this.hint && (this.hint.destroy = !0),
      (this.hint = addSprite(!1, "misc/red_arrow", 30, -20, 1, this)),
      this.hint.fadeTo(0, 3e3, null, function (e) {
        e.target.obj.destroy = !0;
      }),
      field.curLevel > 0 &&
        createHint(7, 2, field.well, 70, 40, !1, 10, -10, !1);
  }),
  (Well.prototype.fall = function (e) {
    var t = this;
    (this.isFalling = !0),
      this.moveBy(
        0,
        (320 * e) / 10,
        (e * this.FallingTime * 1e3) / 10,
        null,
        function () {
          t.landing();
        }
      );
  }),
  (Well.prototype.landing = function () {
    (this.isFalling = !1),
      (this.bottom = this.y + this.height / 2),
      this.setZIndex(1),
      effectDust(this, 0);
  }),
  (Well.prototype.upgrade = function () {
    if (this.curUp < config["access" + this.xmlName]) {
      this.curUp++, (this.name = this.Upgrades["Up" + this.curUp].Picture);
      var e = library.getAsset(this.name);
      (this.bitmap = e.bitmap),
        (this.width = e.width),
        (this.height = e.height),
        (this.framesCount = e.framesCount),
        (this.totalFrames = e.frames),
        (this.layers = e.layers),
        (this.currentFrameX = this.currentFrame),
        (this.delta = this.Upgrades["Up" + this.curUp].DeltaWater),
        (this.reloadTime = this.Upgrades["Up" + this.curUp].ReloadTime),
        (this.fillCost = this.Upgrades["Up" + this.curUp].FillWellCost),
        (this.up.cost =
          config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
        (this.up.y = this.height / 2 - 45),
        (this.starUp.cost =
          config.Game.EndlessMode.OpeningCosts.Item[
            xmlNameToUp(this.xmlName)
          ].c[this.curUp].cost),
        (this.starUp.y = this.height / 2 - 45),
        this.numbers.write(this.up.cost),
        this.numbersStar.write(this.starUp.cost),
        this.numbersCost.write(this.fillCost),
        field.endless && ((this.up.visible = !1), (this.starUp.visible = !0)),
        this.curUp == config["access" + this.xmlName] &&
          ((this.up.visible = !1), (this.starUp.visible = !1)),
        (this.y = this.bottom - this.height / 2),
        3 == this.curUp &&
          ((this.indicator.visible = !1), this.switchToAutoFill());
    }
  }),
  (Well.prototype.update = function () {
    (this.waterActual -= this.delta),
      this.waterActual < 0 && (this.waterActual = 0),
      0 == this.waterActual && (this.coin.visible = !0);
    var e = Math.floor(
      this.indicator.totalFrames -
        1 -
        this.indicator.totalFrames * (this.waterActual / this.waterMax)
    );
    this.indicator.gotoAndStop(e);
  }),
  (Well.prototype.fill = function () {
    if (0 == this.waterActual && !field.pause) {
      if (money < this.fillCost) return void field.hintArrow();
      playSound("action_well"),
        addMoney(-this.fillCost),
        (this.reloading = !0),
        this.play(),
        (this.coin.visible = !1);
    }
  }),
  (Well.prototype.switchToAutoFill = function () {
    (this.autoFill = !this.autoFill), this.autoFill ? this.play() : this.stop();
  }),
  (Well.prototype.tick = function (e) {
    if (this.autoFill)
      money >= this.fillCost
        ? this.autoFillTime >= 1e3
          ? (addMoney(-this.fillCost),
            (this.autoFillTime = 0),
            field.addGrass())
          : (this.autoFillTime += e)
        : this.switchToAutoFill();
    else {
      if (!this.reloading) return;
      (this.waterActual += (this.waterMax * e) / (1e3 * this.reloadTime)),
        this.waterActual >= this.waterMax &&
          ((this.waterActual = this.waterMax),
          (this.reloading = !1),
          (this.onchangeframe = function (e) {
            e.target.currentFrameX == e.target.framesCount - 1 &&
              ((this.onchangeframe = function () {}), this.stop());
          }));
      var t = Math.floor(
        this.indicator.totalFrames -
          this.indicator.totalFrames * (this.waterActual / this.waterMax)
      );
      this.indicator.gotoAndStop(t);
    }
  }),
  Utils.extend(Car, Sprite),
  (Car.prototype.fall = function (e) {
    var t = this;
    (this.isFalling = !0),
      this.moveBy(
        0,
        (320 * e) / 10,
        (e * this.FallingTime * 1e3) / 10,
        null,
        function () {
          t.landing();
        }
      );
  }),
  (Car.prototype.landing = function () {
    (this.isFalling = !1),
      (this.bottom = this.y + this.height / 2),
      effectDust(this, 0);
  }),
  (Car.prototype.upgrade = function () {
    if (this.curUp < config["access" + this.xmlName]) {
      this.curUp++, (this.name = this.Upgrades["Up" + this.curUp].Picture);
      var e = library.getAsset(this.name);
      (this.bitmap = e.bitmap),
        (this.width = e.width),
        (this.height = e.height),
        (this.framesCount = e.framesCount),
        (this.totalFrames = e.frames),
        (this.layers = e.layers),
        (this.currentFrameX = this.currentFrame),
        (this.up.cost =
          config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
        (this.up.y = this.height / 2 - 25),
        (this.starUp.cost =
          config.Game.EndlessMode.OpeningCosts.Item[
            xmlNameToUp(this.xmlName)
          ].c[this.curUp].cost),
        (this.starUp.y = this.height / 2 - 25),
        this.numbers.write(this.up.cost),
        this.numbersStar.write(this.starUp.cost),
        field.endless && ((this.up.visible = !1), (this.starUp.visible = !0)),
        this.curUp == config["access" + this.xmlName] &&
          ((this.up.visible = !1), (this.starUp.visible = !1)),
        (this.y = this.bottom - this.height / 2);
    }
  }),
  Utils.extend(Avia, Sprite),
  (Avia.prototype.fall = function (e) {
    var t = this;
    (this.isFalling = !0),
      this.moveBy(
        0,
        (320 * e) / 10,
        (e * this.FallingTime * 1e3) / 10,
        null,
        function () {
          t.landing();
        }
      );
  }),
  (Avia.prototype.landing = function () {
    (this.isFalling = !1),
      (this.bottom = this.y + this.height / 2),
      effectDust(this, 0);
  }),
  (Avia.prototype.upgrade = function () {
    if (this.curUp < config["access" + this.xmlName]) {
      this.curUp++, (this.name = this.Upgrades["Up" + this.curUp].Picture);
      var e = library.getAsset(this.name);
      (this.bitmap = e.bitmap),
        (this.width = e.width),
        (this.height = e.height),
        (this.framesCount = e.framesCount),
        (this.totalFrames = e.frames),
        (this.layers = e.layers),
        (this.currentFrameX = this.currentFrame),
        (this.up.cost =
          config.Game.Costs.Item[xmlNameToUp(this.xmlName)].c[this.curUp].cost),
        (this.up.y = this.height / 2 - 15),
        (this.starUp.cost =
          config.Game.EndlessMode.OpeningCosts.Item[
            xmlNameToUp(this.xmlName)
          ].c[this.curUp].cost),
        (this.starUp.y = this.height / 2 - 15),
        this.numbers.write(this.up.cost),
        this.numbersStar.write(this.starUp.cost),
        field.endless && ((this.up.visible = !1), (this.starUp.visible = !0)),
        this.curUp == config["access" + this.xmlName] &&
          ((this.up.visible = !1), (this.starUp.visible = !1)),
        (this.y = this.bottom - this.height / 2);
    }
  });
var font_white2 = [
    {
      id: 1040,
      x: 1,
      y: 1,
      width: 23.5,
      height: 27,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 23,
    },
    {
      id: 1041,
      x: 25.5,
      y: 1,
      width: 19.5,
      height: 26.5,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 1042,
      x: 46,
      y: 1,
      width: 19.5,
      height: 26.5,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 23,
    },
    {
      id: 1043,
      x: 66.5,
      y: 1,
      width: 15.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 18,
    },
    {
      id: 1044,
      x: 25.5,
      y: 28.5,
      width: 26,
      height: 31.5,
      xoffset: 0.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 27,
    },
    {
      id: 1045,
      x: 1,
      y: 29,
      width: 15.5,
      height: 26.5,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 1046,
      x: 83,
      y: 1,
      width: 34.5,
      height: 27,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 34,
    },
    {
      id: 1047,
      x: 1,
      y: 56.5,
      width: 19.5,
      height: 27,
      xoffset: 0.5,
      yoffset: 13,
      page: 0,
      xadvance: 21,
    },
    {
      id: 1048,
      x: 118.5,
      y: 1,
      width: 23,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1049,
      x: 142.5,
      y: 1,
      width: 23,
      height: 34.5,
      xoffset: 2.5,
      yoffset: 5.5,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1050,
      x: 52.5,
      y: 29,
      width: 21,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 23,
    },
    {
      id: 1051,
      x: 74.5,
      y: 29,
      width: 24,
      height: 27,
      xoffset: 1.5,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1052,
      x: 99.5,
      y: 29,
      width: 31.5,
      height: 27,
      xoffset: 0.5,
      yoffset: 13,
      page: 0,
      xadvance: 32.5,
    },
    {
      id: 1053,
      x: 166.5,
      y: 1,
      width: 23,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1054,
      x: 190.5,
      y: 1,
      width: 25.5,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1055,
      x: 217,
      y: 1,
      width: 23,
      height: 27,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1056,
      x: 241,
      y: 1,
      width: 19.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 1057,
      x: 261.5,
      y: 1,
      width: 21.5,
      height: 28,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 23,
    },
    {
      id: 1058,
      x: 166.5,
      y: 29,
      width: 19,
      height: 27,
      xoffset: -0.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 18,
    },
    {
      id: 1059,
      x: 132,
      y: 36.5,
      width: 21.5,
      height: 32,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 21,
    },
    {
      id: 1060,
      x: 186.5,
      y: 29,
      width: 29.5,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 31,
    },
    {
      id: 1061,
      x: 217,
      y: 29,
      width: 22.5,
      height: 27,
      xoffset: -0.5,
      yoffset: 13,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 1062,
      x: 52.5,
      y: 57,
      width: 25.5,
      height: 32,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 1063,
      x: 240.5,
      y: 29,
      width: 19,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1064,
      x: 1,
      y: 84.5,
      width: 31.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 36,
    },
    {
      id: 1065,
      x: 79,
      y: 57,
      width: 34.5,
      height: 32,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 37,
    },
    {
      id: 1066,
      x: 284,
      y: 1,
      width: 25.5,
      height: 26.5,
      xoffset: 0.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 1067,
      x: 310.5,
      y: 1,
      width: 28,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 32,
    },
    {
      id: 1068,
      x: 284,
      y: 28.5,
      width: 19.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 1069,
      x: 260.5,
      y: 30,
      width: 21,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 1070,
      x: 154.5,
      y: 57,
      width: 32,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 35,
    },
    {
      id: 1071,
      x: 114.5,
      y: 69.5,
      width: 19,
      height: 27,
      xoffset: 2,
      yoffset: 13.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1025,
      x: 33.5,
      y: 61,
      width: 15.5,
      height: 34.5,
      xoffset: 2.5,
      yoffset: 5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 1072,
      x: 50,
      y: 90,
      width: 19.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1073,
      x: 134.5,
      y: 69.5,
      width: 19,
      height: 29,
      xoffset: 1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 21,
    },
    {
      id: 1074,
      x: 70.5,
      y: 90,
      width: 17.5,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 20.5,
    },
    {
      id: 1075,
      x: 33.5,
      y: 96.5,
      width: 13,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 14,
    },
    {
      id: 1076,
      x: 89,
      y: 90,
      width: 22.5,
      height: 24.5,
      xoffset: -0.5,
      yoffset: 20,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 1077,
      x: 112.5,
      y: 97.5,
      width: 19.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 21,
    },
    {
      id: 1078,
      x: 1,
      y: 112.5,
      width: 28,
      height: 20.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 1079,
      x: 70.5,
      y: 111.5,
      width: 17,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 1080,
      x: 47.5,
      y: 112,
      width: 18.5,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1081,
      x: 88.5,
      y: 115.5,
      width: 18.5,
      height: 27.5,
      xoffset: 2,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1082,
      x: 30,
      y: 133.5,
      width: 17.5,
      height: 20.5,
      xoffset: 2,
      yoffset: 19.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 1083,
      x: 1,
      y: 134,
      width: 20,
      height: 20.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1084,
      x: 48.5,
      y: 133.5,
      width: 28.5,
      height: 20.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 28,
    },
    {
      id: 1085,
      x: 187.5,
      y: 57,
      width: 18,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1086,
      x: 206.5,
      y: 57,
      width: 20,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 1087,
      x: 187.5,
      y: 78.5,
      width: 18,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1088,
      x: 154.5,
      y: 85,
      width: 19.5,
      height: 28.5,
      xoffset: 2,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 1089,
      x: 133,
      y: 99.5,
      width: 16.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 1090,
      x: 108,
      y: 119.5,
      width: 18,
      height: 20.5,
      xoffset: -0.5,
      yoffset: 20,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 1091,
      x: 227.5,
      y: 57,
      width: 18.5,
      height: 28.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 18,
    },
    {
      id: 1092,
      x: 339.5,
      y: 1,
      width: 28.5,
      height: 36.5,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 30.5,
    },
    {
      id: 1093,
      x: 206.5,
      y: 79,
      width: 19,
      height: 20.5,
      xoffset: 0,
      yoffset: 19.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 1094,
      x: 175,
      y: 100,
      width: 20.5,
      height: 24.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 1095,
      x: 150.5,
      y: 114.5,
      width: 16.5,
      height: 20.5,
      xoffset: 1,
      yoffset: 20,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 1096,
      x: 304.5,
      y: 29,
      width: 29,
      height: 20,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 33.5,
    },
    {
      id: 1097,
      x: 369,
      y: 1,
      width: 31.5,
      height: 24.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 33,
    },
    {
      id: 1098,
      x: 127,
      y: 121.5,
      width: 22,
      height: 20,
      xoffset: 0.5,
      yoffset: 20,
      page: 0,
      xadvance: 23,
    },
    {
      id: 1099,
      x: 401.5,
      y: 1,
      width: 26,
      height: 20,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 29.5,
    },
    {
      id: 1100,
      x: 108,
      y: 141,
      width: 17.5,
      height: 20,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 20.5,
    },
    {
      id: 1101,
      x: 78,
      y: 144,
      width: 16.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 1102,
      x: 22,
      y: 155,
      width: 27,
      height: 21,
      xoffset: 2,
      yoffset: 19.5,
      page: 0,
      xadvance: 30,
    },
    {
      id: 1103,
      x: 1,
      y: 155.5,
      width: 17.5,
      height: 20.5,
      xoffset: 1.5,
      yoffset: 20,
      page: 0,
      xadvance: 20.5,
    },
    {
      id: 1105,
      x: 50,
      y: 155,
      width: 19.5,
      height: 28.5,
      xoffset: 1,
      yoffset: 12,
      page: 0,
      xadvance: 20.5,
    },
    {
      id: 65,
      x: 1,
      y: 177,
      width: 23.5,
      height: 27,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 23,
    },
    {
      id: 66,
      x: 25.5,
      y: 177,
      width: 19.5,
      height: 26.5,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 23,
    },
    {
      id: 67,
      x: 428.5,
      y: 1,
      width: 21,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 68,
      x: 401.5,
      y: 22,
      width: 22.5,
      height: 26.5,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 26,
    },
    {
      id: 69,
      x: 369,
      y: 26.5,
      width: 15.5,
      height: 26.5,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 70,
      x: 334.5,
      y: 38.5,
      width: 15.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 18,
    },
    {
      id: 71,
      x: 304.5,
      y: 50,
      width: 24.5,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 26,
    },
    {
      id: 72,
      x: 247,
      y: 58,
      width: 23,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 73,
      x: 168,
      y: 114.5,
      width: 6,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 11,
    },
    {
      id: 74,
      x: 95.5,
      y: 144,
      width: 11,
      height: 32,
      xoffset: -1.5,
      yoffset: 13,
      page: 0,
      xadvance: 12,
    },
    {
      id: 75,
      x: 282.5,
      y: 56.5,
      width: 21,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 23,
    },
    {
      id: 76,
      x: 150,
      y: 136,
      width: 15.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 17,
    },
    {
      id: 77,
      x: 107.5,
      y: 162,
      width: 31.5,
      height: 27,
      xoffset: 0.5,
      yoffset: 13,
      page: 0,
      xadvance: 32.5,
    },
    {
      id: 78,
      x: 70.5,
      y: 166,
      width: 23,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 79,
      x: 450.5,
      y: 1,
      width: 25.5,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 80,
      x: 46,
      y: 184.5,
      width: 19.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 81,
      x: 477,
      y: 1,
      width: 26,
      height: 28.5,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 27,
    },
    {
      id: 82,
      x: 25.5,
      y: 204.5,
      width: 19,
      height: 27,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 83,
      x: 1,
      y: 205,
      width: 18.5,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 20,
    },
    {
      id: 84,
      x: 425,
      y: 29,
      width: 19,
      height: 27,
      xoffset: -1,
      yoffset: 13.5,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 85,
      x: 445,
      y: 29,
      width: 22.5,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 27,
    },
    {
      id: 86,
      x: 385.5,
      y: 49.5,
      width: 22.5,
      height: 27,
      xoffset: -0.5,
      yoffset: 13,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 87,
      x: 351,
      y: 54,
      width: 33.5,
      height: 27,
      xoffset: 0.5,
      yoffset: 13,
      page: 0,
      xadvance: 34,
    },
    {
      id: 88,
      x: 468.5,
      y: 30.5,
      width: 22.5,
      height: 27,
      xoffset: -0.5,
      yoffset: 13,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 89,
      x: 304.5,
      y: 78,
      width: 21,
      height: 27,
      xoffset: -0.5,
      yoffset: 13,
      page: 0,
      xadvance: 19,
    },
    {
      id: 90,
      x: 326.5,
      y: 78,
      width: 20.5,
      height: 26.5,
      xoffset: 0,
      yoffset: 13.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 97,
      x: 271,
      y: 84.5,
      width: 19.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 98,
      x: 247,
      y: 86,
      width: 19.5,
      height: 28.5,
      xoffset: 2,
      yoffset: 11.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 99,
      x: 492,
      y: 30.5,
      width: 16.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 18,
    },
    {
      id: 100,
      x: 226.5,
      y: 86.5,
      width: 19.5,
      height: 28.5,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 101,
      x: 196.5,
      y: 100.5,
      width: 19.5,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 21,
    },
    {
      id: 102,
      x: 409,
      y: 49.5,
      width: 14,
      height: 28.5,
      xoffset: -0.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 13,
    },
    {
      id: 103,
      x: 385.5,
      y: 77.5,
      width: 19.5,
      height: 29,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 104,
      x: 492,
      y: 52.5,
      width: 18,
      height: 28.5,
      xoffset: 2,
      yoffset: 11.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 105,
      x: 504,
      y: 1,
      width: 7,
      height: 28.5,
      xoffset: 1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 106,
      x: 217,
      y: 100.5,
      width: 7,
      height: 36.5,
      xoffset: 1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 107,
      x: 196.5,
      y: 122.5,
      width: 17.5,
      height: 28.5,
      xoffset: 2,
      yoffset: 11.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 108,
      x: 140,
      y: 142.5,
      width: 6,
      height: 28.5,
      xoffset: 2,
      yoffset: 11.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 109,
      x: 166.5,
      y: 142.5,
      width: 29,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 32.5,
    },
    {
      id: 110,
      x: 348,
      y: 82,
      width: 18,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 22,
    },
    {
      id: 111,
      x: 348,
      y: 103.5,
      width: 20,
      height: 21,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 112,
      x: 326.5,
      y: 105.5,
      width: 19.5,
      height: 28.5,
      xoffset: 2,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 113,
      x: 291.5,
      y: 106,
      width: 19.5,
      height: 28.5,
      xoffset: 1,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 114,
      x: 367,
      y: 82,
      width: 13,
      height: 20.5,
      xoffset: 2,
      yoffset: 19.5,
      page: 0,
      xadvance: 14,
    },
    {
      id: 115,
      x: 369,
      y: 103.5,
      width: 15.5,
      height: 21,
      xoffset: 0.5,
      yoffset: 19.5,
      page: 0,
      xadvance: 16,
    },
    {
      id: 116,
      x: 312,
      y: 106,
      width: 13.5,
      height: 26.5,
      xoffset: -0.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 12.5,
    },
    {
      id: 117,
      x: 267.5,
      y: 106.5,
      width: 18,
      height: 20.5,
      xoffset: 2,
      yoffset: 20,
      page: 0,
      xadvance: 21.5,
    },
    {
      id: 118,
      x: 247,
      y: 115.5,
      width: 18,
      height: 20.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 17,
    },
    {
      id: 119,
      x: 424,
      y: 57,
      width: 28.5,
      height: 20.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 28,
    },
    {
      id: 120,
      x: 225,
      y: 116,
      width: 19,
      height: 20.5,
      xoffset: 0,
      yoffset: 19.5,
      page: 0,
      xadvance: 18,
    },
    {
      id: 121,
      x: 266,
      y: 128,
      width: 18.5,
      height: 28.5,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 18,
    },
    {
      id: 122,
      x: 245,
      y: 137,
      width: 17.5,
      height: 20,
      xoffset: 0,
      yoffset: 20,
      page: 0,
      xadvance: 16.5,
    },
    {
      id: 192,
      x: 215,
      y: 138,
      width: 23,
      height: 38,
      xoffset: 2.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 193,
      x: 453.5,
      y: 58.5,
      width: 23,
      height: 38,
      xoffset: 2.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 194,
      x: 424,
      y: 78.5,
      width: 23,
      height: 38.5,
      xoffset: 2.5,
      yoffset: 2,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 195,
      x: 477.5,
      y: 82,
      width: 24.5,
      height: 36,
      xoffset: 2.5,
      yoffset: 4.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 196,
      x: 448,
      y: 97.5,
      width: 23,
      height: 34,
      xoffset: 2.5,
      yoffset: 6.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 197,
      x: 385.5,
      y: 107.5,
      width: 23,
      height: 36,
      xoffset: 2.5,
      yoffset: 4.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 198,
      x: 147,
      y: 164,
      width: 39.5,
      height: 30,
      xoffset: 0,
      yoffset: 11,
      page: 0,
      xadvance: 39,
    },
    {
      id: 199,
      x: 187.5,
      y: 164,
      width: 21,
      height: 34,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 200,
      x: 347,
      y: 125.5,
      width: 20.5,
      height: 41,
      xoffset: 1.5,
      yoffset: 0.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 201,
      x: 312,
      y: 135,
      width: 20.5,
      height: 41.5,
      xoffset: 1.5,
      yoffset: 0.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 202,
      x: 285.5,
      y: 135.5,
      width: 20.5,
      height: 41.5,
      xoffset: 1.5,
      yoffset: 0,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 203,
      x: 263.5,
      y: 157.5,
      width: 20.5,
      height: 37,
      xoffset: 1.5,
      yoffset: 4.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 204,
      x: 239,
      y: 158,
      width: 19,
      height: 38,
      xoffset: 1.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 205,
      x: 209.5,
      y: 177,
      width: 19,
      height: 38,
      xoffset: 0.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 206,
      x: 409.5,
      y: 118,
      width: 19,
      height: 39,
      xoffset: 1.5,
      yoffset: 1.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 207,
      x: 472,
      y: 119,
      width: 19,
      height: 34.5,
      xoffset: 0.5,
      yoffset: 6,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 208,
      x: 368.5,
      y: 144.5,
      width: 26.5,
      height: 29.5,
      xoffset: -1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 26,
    },
    {
      id: 209,
      x: 333.5,
      y: 167.5,
      width: 26.5,
      height: 37,
      xoffset: 1.5,
      yoffset: 4,
      page: 0,
      xadvance: 29.5,
    },
    {
      id: 210,
      x: 429.5,
      y: 132.5,
      width: 27,
      height: 38.5,
      xoffset: 2,
      yoffset: 2.5,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 211,
      x: 396,
      y: 158,
      width: 27,
      height: 38.5,
      xoffset: 1,
      yoffset: 2.5,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 212,
      x: 361,
      y: 175,
      width: 27,
      height: 38.5,
      xoffset: 2,
      yoffset: 2,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 213,
      x: 285,
      y: 178,
      width: 27,
      height: 36.5,
      xoffset: 2,
      yoffset: 4.5,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 214,
      x: 313,
      y: 205.5,
      width: 27,
      height: 35,
      xoffset: 1,
      yoffset: 6,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 215,
      x: 30,
      y: 118,
      width: 15.5,
      height: 14,
      xoffset: 3.5,
      yoffset: 21.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 216,
      x: 94.5,
      y: 190,
      width: 29,
      height: 29,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 217,
      x: 259,
      y: 195.5,
      width: 23.5,
      height: 38.5,
      xoffset: 1.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 218,
      x: 66.5,
      y: 194,
      width: 23.5,
      height: 38.5,
      xoffset: 1.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 219,
      x: 283.5,
      y: 215.5,
      width: 23.5,
      height: 39,
      xoffset: 1.5,
      yoffset: 2,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 220,
      x: 229.5,
      y: 197,
      width: 23.5,
      height: 34.5,
      xoffset: 1.5,
      yoffset: 6.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 221,
      x: 20.5,
      y: 232.5,
      width: 22.5,
      height: 40,
      xoffset: 0.5,
      yoffset: 1,
      page: 0,
      xadvance: 23,
    },
    {
      id: 222,
      x: 1,
      y: 233,
      width: 17.5,
      height: 28,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 223,
      x: 1,
      y: 262,
      width: 16.5,
      height: 30.5,
      xoffset: 1.5,
      yoffset: 12,
      page: 0,
      xadvance: 19,
    },
    {
      id: 224,
      x: 341,
      y: 205.5,
      width: 18.5,
      height: 30.5,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 225,
      x: 492,
      y: 119,
      width: 18.5,
      height: 30.5,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 226,
      x: 492,
      y: 150.5,
      width: 18.5,
      height: 31,
      xoffset: 1,
      yoffset: 10,
      page: 0,
      xadvance: 20,
    },
    {
      id: 227,
      x: 45.5,
      y: 212.5,
      width: 18.5,
      height: 28.5,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 228,
      x: 313,
      y: 177.5,
      width: 18.5,
      height: 26.5,
      xoffset: 1,
      yoffset: 14.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 229,
      x: 124.5,
      y: 190,
      width: 18.5,
      height: 32,
      xoffset: 1,
      yoffset: 9,
      page: 0,
      xadvance: 20,
    },
    {
      id: 230,
      x: 91,
      y: 220,
      width: 32,
      height: 19.5,
      xoffset: 0.5,
      yoffset: 21.5,
      page: 0,
      xadvance: 33,
    },
    {
      id: 231,
      x: 406,
      y: 79,
      width: 17,
      height: 26.5,
      xoffset: 1,
      yoffset: 21,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 232,
      x: 65,
      y: 233.5,
      width: 18,
      height: 30,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 233,
      x: 44,
      y: 242,
      width: 18,
      height: 30.5,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 234,
      x: 457.5,
      y: 154.5,
      width: 18,
      height: 30.5,
      xoffset: 1,
      yoffset: 10,
      page: 0,
      xadvance: 20,
    },
    {
      id: 235,
      x: 424,
      y: 172,
      width: 18,
      height: 28,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 236,
      x: 333.5,
      y: 135,
      width: 9,
      height: 30,
      xoffset: 0.5,
      yoffset: 10.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 237,
      x: 443,
      y: 172,
      width: 9.5,
      height: 30,
      xoffset: 1.5,
      yoffset: 10.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 238,
      x: 389,
      y: 197.5,
      width: 16,
      height: 30.5,
      xoffset: -2.5,
      yoffset: 10,
      page: 0,
      xadvance: 10,
    },
    {
      id: 239,
      x: 476.5,
      y: 154.5,
      width: 14.5,
      height: 26,
      xoffset: -2,
      yoffset: 14.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 240,
      x: 406,
      y: 197.5,
      width: 15.5,
      height: 28,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 241,
      x: 422.5,
      y: 201,
      width: 18.5,
      height: 28.5,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 242,
      x: 360.5,
      y: 214.5,
      width: 17,
      height: 30.5,
      xoffset: 1.5,
      yoffset: 10.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 243,
      x: 341,
      y: 237,
      width: 17,
      height: 30.5,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 244,
      x: 308,
      y: 241.5,
      width: 17.5,
      height: 31,
      xoffset: 1.5,
      yoffset: 10,
      page: 0,
      xadvance: 19,
    },
    {
      id: 245,
      x: 476.5,
      y: 182.5,
      width: 19.5,
      height: 28.5,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 246,
      x: 453.5,
      y: 186,
      width: 17.5,
      height: 26.5,
      xoffset: 1,
      yoffset: 14.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 247,
      x: 472,
      y: 212,
      width: 17,
      height: 17,
      xoffset: 2.5,
      yoffset: 19.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 248,
      x: 490,
      y: 212,
      width: 18.5,
      height: 19.5,
      xoffset: 0.5,
      yoffset: 21.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 249,
      x: 442,
      y: 213.5,
      width: 17,
      height: 31,
      xoffset: 2,
      yoffset: 10.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 250,
      x: 460,
      y: 230,
      width: 17,
      height: 31,
      xoffset: 2,
      yoffset: 10.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 251,
      x: 478,
      y: 232.5,
      width: 17.5,
      height: 31.5,
      xoffset: 2,
      yoffset: 10,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 252,
      x: 144,
      y: 195,
      width: 17,
      height: 27,
      xoffset: 2,
      yoffset: 14.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 253,
      x: 162,
      y: 195,
      width: 19.5,
      height: 39.5,
      xoffset: 0,
      yoffset: 10.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 254,
      x: 182.5,
      y: 199,
      width: 17.5,
      height: 36.5,
      xoffset: 1.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 255,
      x: 201,
      y: 216,
      width: 19.5,
      height: 35.5,
      xoffset: 0,
      yoffset: 14.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 256,
      x: 221.5,
      y: 232.5,
      width: 23,
      height: 33,
      xoffset: 1.5,
      yoffset: 7.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 257,
      x: 245.5,
      y: 235,
      width: 18.5,
      height: 25.5,
      xoffset: 1,
      yoffset: 15.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 258,
      x: 124,
      y: 223,
      width: 23,
      height: 36.5,
      xoffset: 1.5,
      yoffset: 4,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 259,
      x: 148,
      y: 235.5,
      width: 18.5,
      height: 29.5,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 260,
      x: 167.5,
      y: 236.5,
      width: 25.5,
      height: 32,
      xoffset: 1.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 261,
      x: 194,
      y: 252.5,
      width: 22.5,
      height: 24.5,
      xoffset: 1,
      yoffset: 21.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 262,
      x: 84,
      y: 240.5,
      width: 21,
      height: 38,
      xoffset: 1,
      yoffset: 2.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 263,
      x: 106,
      y: 240.5,
      width: 17,
      height: 30.5,
      xoffset: 0.5,
      yoffset: 10.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 264,
      x: 124,
      y: 260.5,
      width: 21.5,
      height: 39,
      xoffset: 1,
      yoffset: 1,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 265,
      x: 146.5,
      y: 266,
      width: 18,
      height: 31,
      xoffset: 0.5,
      yoffset: 10,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 266,
      x: 165.5,
      y: 269.5,
      width: 21,
      height: 34,
      xoffset: 1,
      yoffset: 6.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 267,
      x: 106,
      y: 272,
      width: 17,
      height: 26.5,
      xoffset: 0.5,
      yoffset: 14.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 268,
      x: 265,
      y: 255.5,
      width: 21,
      height: 37,
      xoffset: 1,
      yoffset: 3,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 269,
      x: 146.5,
      y: 298,
      width: 17,
      height: 30,
      xoffset: 0.5,
      yoffset: 11,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 270,
      x: 378.5,
      y: 229,
      width: 22.5,
      height: 38.5,
      xoffset: 2.5,
      yoffset: 3,
      page: 0,
      xadvance: 26,
    },
    {
      id: 271,
      x: 402,
      y: 230.5,
      width: 26,
      height: 29,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 272,
      x: 429,
      y: 245.5,
      width: 26.5,
      height: 29.5,
      xoffset: -1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 26,
    },
    {
      id: 273,
      x: 402,
      y: 260.5,
      width: 22,
      height: 29,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 21,
    },
    {
      id: 274,
      x: 456.5,
      y: 262,
      width: 20.5,
      height: 35.5,
      xoffset: 1.5,
      yoffset: 6,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 275,
      x: 245.5,
      y: 261.5,
      width: 18,
      height: 25.5,
      xoffset: 1,
      yoffset: 15.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 276,
      x: 217.5,
      y: 266.5,
      width: 20.5,
      height: 38.5,
      xoffset: 1.5,
      yoffset: 3,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 277,
      x: 359,
      y: 246,
      width: 18.5,
      height: 29,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 278,
      x: 378.5,
      y: 268.5,
      width: 20.5,
      height: 36.5,
      xoffset: 1.5,
      yoffset: 5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 279,
      x: 63,
      y: 264.5,
      width: 18,
      height: 26.5,
      xoffset: 1,
      yoffset: 14.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 280,
      x: 82,
      y: 279.5,
      width: 20.5,
      height: 35.5,
      xoffset: 1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 281,
      x: 103.5,
      y: 299.5,
      width: 18,
      height: 25.5,
      xoffset: 1,
      yoffset: 21.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 282,
      x: 122.5,
      y: 300.5,
      width: 20.5,
      height: 39,
      xoffset: 1.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 283,
      x: 287,
      y: 255.5,
      width: 18,
      height: 29.5,
      xoffset: 1,
      yoffset: 11,
      page: 0,
      xadvance: 20,
    },
    {
      id: 284,
      x: 239,
      y: 288,
      width: 24,
      height: 39,
      xoffset: 0.5,
      yoffset: 2,
      page: 0,
      xadvance: 24.5,
    },
    {
      id: 285,
      x: 187.5,
      y: 278,
      width: 19,
      height: 40,
      xoffset: 0.5,
      yoffset: 10,
      page: 0,
      xadvance: 19,
    },
    {
      id: 286,
      x: 207.5,
      y: 306,
      width: 24,
      height: 37,
      xoffset: 0.5,
      yoffset: 4,
      page: 0,
      xadvance: 24.5,
    },
    {
      id: 287,
      x: 164.5,
      y: 304.5,
      width: 19,
      height: 38,
      xoffset: 0.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 288,
      x: 425,
      y: 276,
      width: 24,
      height: 34.5,
      xoffset: 0.5,
      yoffset: 6.5,
      page: 0,
      xadvance: 24.5,
    },
    {
      id: 289,
      x: 144,
      y: 329,
      width: 18.5,
      height: 35.5,
      xoffset: 0.5,
      yoffset: 14.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 290,
      x: 400,
      y: 290.5,
      width: 24,
      height: 35.5,
      xoffset: 0.5,
      yoffset: 12,
      page: 0,
      xadvance: 24.5,
    },
    {
      id: 291,
      x: 184.5,
      y: 319,
      width: 18.5,
      height: 40,
      xoffset: 0.5,
      yoffset: 10,
      page: 0,
      xadvance: 19,
    },
    {
      id: 292,
      x: 326.5,
      y: 268.5,
      width: 24.5,
      height: 39.5,
      xoffset: 2,
      yoffset: 2,
      page: 0,
      xadvance: 27.5,
    },
    {
      id: 293,
      x: 352,
      y: 276,
      width: 21,
      height: 39,
      xoffset: 2,
      yoffset: 2,
      page: 0,
      xadvance: 21,
    },
    {
      id: 294,
      x: 478,
      y: 265,
      width: 30.5,
      height: 29,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 31.5,
    },
    {
      id: 295,
      x: 374,
      y: 306,
      width: 21.5,
      height: 29.5,
      xoffset: -1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 21,
    },
    {
      id: 296,
      x: 306,
      y: 273.5,
      width: 19,
      height: 36,
      xoffset: 0.5,
      yoffset: 4.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 297,
      x: 287,
      y: 286,
      width: 18,
      height: 28,
      xoffset: -3.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 298,
      x: 163.5,
      y: 343.5,
      width: 19,
      height: 33,
      xoffset: 0.5,
      yoffset: 7.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 299,
      x: 264,
      y: 293.5,
      width: 15,
      height: 25,
      xoffset: -2,
      yoffset: 15.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 300,
      x: 326,
      y: 309,
      width: 19,
      height: 36.5,
      xoffset: 0.5,
      yoffset: 4,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 301,
      x: 306,
      y: 310.5,
      width: 16.5,
      height: 28.5,
      xoffset: -2.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 302,
      x: 280,
      y: 315,
      width: 19,
      height: 34,
      xoffset: 0.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 303,
      x: 264,
      y: 319.5,
      width: 11,
      height: 32.5,
      xoffset: 0.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 304,
      x: 300,
      y: 340,
      width: 19,
      height: 34,
      xoffset: 0.5,
      yoffset: 6.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 305,
      x: 239,
      y: 266.5,
      width: 5.5,
      height: 19,
      xoffset: 2.5,
      yoffset: 21.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 306,
      x: 18.5,
      y: 273.5,
      width: 41,
      height: 29,
      xoffset: 0.5,
      yoffset: 13,
      page: 0,
      xadvance: 42.5,
    },
    {
      id: 307,
      x: 1,
      y: 293.5,
      width: 15.5,
      height: 37,
      xoffset: 2.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 308,
      x: 276,
      y: 350,
      width: 22.5,
      height: 40,
      xoffset: 1,
      yoffset: 2,
      page: 0,
      xadvance: 24,
    },
    {
      id: 309,
      x: 60.5,
      y: 292,
      width: 17,
      height: 40.5,
      xoffset: -1,
      yoffset: 10,
      page: 0,
      xadvance: 14.5,
    },
    {
      id: 310,
      x: 78.5,
      y: 316,
      width: 19.5,
      height: 35.5,
      xoffset: 2,
      yoffset: 13,
      page: 0,
      xadvance: 22,
    },
    {
      id: 311,
      x: 99,
      y: 326,
      width: 17.5,
      height: 36.5,
      xoffset: 1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 312,
      x: 117.5,
      y: 340.5,
      width: 17.5,
      height: 21.5,
      xoffset: 2,
      yoffset: 19,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 313,
      x: 117.5,
      y: 363,
      width: 19,
      height: 39,
      xoffset: 1,
      yoffset: 2.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 314,
      x: 137.5,
      y: 365.5,
      width: 10,
      height: 39,
      xoffset: 2.5,
      yoffset: 1.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 315,
      x: 346,
      y: 316,
      width: 19,
      height: 35,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 316,
      x: 148.5,
      y: 365.5,
      width: 10.5,
      height: 35.5,
      xoffset: 1.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 317,
      x: 320,
      y: 346.5,
      width: 19,
      height: 29,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 318,
      x: 496.5,
      y: 232.5,
      width: 12.5,
      height: 29,
      xoffset: 2.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 16.5,
    },
    {
      id: 319,
      x: 299.5,
      y: 375,
      width: 19,
      height: 29,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 320,
      x: 232.5,
      y: 328,
      width: 12,
      height: 29,
      xoffset: 2.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 15,
    },
    {
      id: 321,
      x: 204,
      y: 344,
      width: 23,
      height: 29,
      xoffset: 0,
      yoffset: 12.5,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 322,
      x: 497,
      y: 182.5,
      width: 13,
      height: 27.5,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 13,
    },
    {
      id: 323,
      x: 245.5,
      y: 353,
      width: 26.5,
      height: 38.5,
      xoffset: 1.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 29.5,
    },
    {
      id: 324,
      x: 183.5,
      y: 360,
      width: 17,
      height: 30.5,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 325,
      x: 478,
      y: 295,
      width: 26.5,
      height: 35.5,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 29.5,
    },
    {
      id: 326,
      x: 160,
      y: 377.5,
      width: 17,
      height: 29,
      xoffset: 1,
      yoffset: 20.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 327,
      x: 450,
      y: 298.5,
      width: 26.5,
      height: 38,
      xoffset: 1.5,
      yoffset: 3,
      page: 0,
      xadvance: 29.5,
    },
    {
      id: 328,
      x: 425,
      y: 311.5,
      width: 17,
      height: 30,
      xoffset: 1,
      yoffset: 11,
      page: 0,
      xadvance: 19,
    },
    {
      id: 329,
      x: 273,
      y: 391,
      width: 21,
      height: 31,
      xoffset: 1.5,
      yoffset: 10,
      page: 0,
      xadvance: 23,
    },
    {
      id: 330,
      x: 396.5,
      y: 327,
      width: 26.5,
      height: 37,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 29.5,
    },
    {
      id: 331,
      x: 366,
      y: 336.5,
      width: 17,
      height: 27,
      xoffset: 1,
      yoffset: 20.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 332,
      x: 477.5,
      y: 331.5,
      width: 27,
      height: 33.5,
      xoffset: 1,
      yoffset: 7.5,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 333,
      x: 340,
      y: 352,
      width: 17,
      height: 25.5,
      xoffset: 0.5,
      yoffset: 15.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 334,
      x: 443,
      y: 337.5,
      width: 27,
      height: 37,
      xoffset: 1,
      yoffset: 4,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 335,
      x: 319.5,
      y: 376.5,
      width: 18.5,
      height: 29,
      xoffset: 0.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 336,
      x: 358,
      y: 364.5,
      width: 27,
      height: 37,
      xoffset: 1,
      yoffset: 3.5,
      page: 0,
      xadvance: 28.5,
    },
    {
      id: 337,
      x: 295,
      y: 405,
      width: 19.5,
      height: 29,
      xoffset: 0.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 338,
      x: 17.5,
      y: 303.5,
      width: 42,
      height: 30,
      xoffset: 1.5,
      yoffset: 11,
      page: 0,
      xadvance: 43,
    },
    {
      id: 339,
      x: 471,
      y: 366,
      width: 32,
      height: 19.5,
      xoffset: 0.5,
      yoffset: 21.5,
      page: 0,
      xadvance: 32.5,
    },
    {
      id: 340,
      x: 201.5,
      y: 374,
      width: 21,
      height: 38,
      xoffset: 1.5,
      yoffset: 2.5,
      page: 0,
      xadvance: 23,
    },
    {
      id: 341,
      x: 1,
      y: 331.5,
      width: 15.5,
      height: 30.5,
      xoffset: 1.5,
      yoffset: 10.5,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 342,
      x: 223.5,
      y: 374,
      width: 21,
      height: 35,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 23,
    },
    {
      id: 343,
      x: 60.5,
      y: 333.5,
      width: 16.5,
      height: 26.5,
      xoffset: 0.5,
      yoffset: 21,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 344,
      x: 178,
      y: 391.5,
      width: 21,
      height: 37.5,
      xoffset: 1.5,
      yoffset: 3,
      page: 0,
      xadvance: 23,
    },
    {
      id: 345,
      x: 339,
      y: 378.5,
      width: 15.5,
      height: 30,
      xoffset: 1.5,
      yoffset: 11,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 346,
      x: 245.5,
      y: 392.5,
      width: 23.5,
      height: 38.5,
      xoffset: 1,
      yoffset: 2.5,
      page: 0,
      xadvance: 25,
    },
    {
      id: 347,
      x: 424,
      y: 342.5,
      width: 15.5,
      height: 30.5,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 348,
      x: 270,
      y: 423,
      width: 23.5,
      height: 39,
      xoffset: 1,
      yoffset: 2,
      page: 0,
      xadvance: 25,
    },
    {
      id: 349,
      x: 78,
      y: 352.5,
      width: 16,
      height: 31,
      xoffset: 0.5,
      yoffset: 10,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 350,
      x: 386,
      y: 365,
      width: 23.5,
      height: 34,
      xoffset: 1,
      yoffset: 14,
      page: 0,
      xadvance: 25,
    },
    {
      id: 351,
      x: 223.5,
      y: 410,
      width: 15.5,
      height: 27,
      xoffset: 1,
      yoffset: 21,
      page: 0,
      xadvance: 17.5,
    },
    {
      id: 352,
      x: 240,
      y: 432,
      width: 23.5,
      height: 38,
      xoffset: 2,
      yoffset: 3,
      page: 0,
      xadvance: 25,
    },
    {
      id: 353,
      x: 95,
      y: 363.5,
      width: 15.5,
      height: 30,
      xoffset: 0,
      yoffset: 11,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 354,
      x: 410.5,
      y: 374,
      width: 25.5,
      height: 33.5,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 25,
    },
    {
      id: 355,
      x: 200,
      y: 413,
      width: 16.5,
      height: 32,
      xoffset: 0.5,
      yoffset: 15,
      page: 0,
      xadvance: 17,
    },
    {
      id: 356,
      x: 437,
      y: 375.5,
      width: 25.5,
      height: 37,
      xoffset: 0,
      yoffset: 3,
      page: 0,
      xadvance: 25,
    },
    {
      id: 357,
      x: 315.5,
      y: 406.5,
      width: 22,
      height: 26,
      xoffset: 0.5,
      yoffset: 15,
      page: 0,
      xadvance: 23,
    },
    {
      id: 358,
      x: 17.5,
      y: 334.5,
      width: 25.5,
      height: 27,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 25,
    },
    {
      id: 359,
      x: 217.5,
      y: 438,
      width: 16.5,
      height: 26,
      xoffset: 0.5,
      yoffset: 15,
      page: 0,
      xadvance: 17,
    },
    {
      id: 360,
      x: 386,
      y: 400,
      width: 23.5,
      height: 36.5,
      xoffset: 1.5,
      yoffset: 4.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 361,
      x: 410.5,
      y: 408.5,
      width: 18,
      height: 29,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 362,
      x: 355.5,
      y: 402.5,
      width: 23.5,
      height: 33.5,
      xoffset: 1.5,
      yoffset: 7.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 363,
      x: 44,
      y: 361,
      width: 17,
      height: 26,
      xoffset: 1,
      yoffset: 15.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 364,
      x: 17.5,
      y: 362.5,
      width: 23.5,
      height: 37.5,
      xoffset: 1.5,
      yoffset: 4,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 365,
      x: 62,
      y: 384.5,
      width: 17,
      height: 29.5,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 366,
      x: 80,
      y: 394.5,
      width: 23.5,
      height: 40.5,
      xoffset: 1.5,
      yoffset: 1,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 367,
      x: 42,
      y: 388,
      width: 17,
      height: 32.5,
      xoffset: 1,
      yoffset: 9,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 368,
      x: 104.5,
      y: 403,
      width: 23.5,
      height: 37.5,
      xoffset: 1.5,
      yoffset: 3.5,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 369,
      x: 60,
      y: 415,
      width: 19,
      height: 29.5,
      xoffset: 1,
      yoffset: 11.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 370,
      x: 80,
      y: 436,
      width: 23.5,
      height: 34.5,
      xoffset: 1.5,
      yoffset: 13,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 371,
      x: 129,
      y: 405.5,
      width: 20.5,
      height: 26.5,
      xoffset: 1,
      yoffset: 21,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 372,
      x: 315.5,
      y: 433.5,
      width: 36,
      height: 39.5,
      xoffset: 1,
      yoffset: 2,
      page: 0,
      xadvance: 37.5,
    },
    {
      id: 373,
      x: 150.5,
      y: 407.5,
      width: 24,
      height: 31.5,
      xoffset: 0.5,
      yoffset: 10,
      page: 0,
      xadvance: 24.5,
    },
    {
      id: 374,
      x: 175.5,
      y: 430,
      width: 22.5,
      height: 39,
      xoffset: 0,
      yoffset: 2,
      page: 0,
      xadvance: 23,
    },
    {
      id: 375,
      x: 294.5,
      y: 435,
      width: 19.5,
      height: 40,
      xoffset: 0,
      yoffset: 10,
      page: 0,
      xadvance: 20,
    },
    {
      id: 376,
      x: 264.5,
      y: 463,
      width: 22.5,
      height: 34.5,
      xoffset: 0.5,
      yoffset: 6.5,
      page: 0,
      xadvance: 23,
    },
    {
      id: 377,
      x: 352.5,
      y: 437,
      width: 24.5,
      height: 38,
      xoffset: 0,
      yoffset: 2.5,
      page: 0,
      xadvance: 25,
    },
    {
      id: 378,
      x: 199,
      y: 446,
      width: 17.5,
      height: 31,
      xoffset: 1,
      yoffset: 10.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 379,
      x: 378,
      y: 437.5,
      width: 24.5,
      height: 34.5,
      xoffset: 0,
      yoffset: 6.5,
      page: 0,
      xadvance: 25,
    },
    {
      id: 380,
      x: 129,
      y: 433,
      width: 17.5,
      height: 27,
      xoffset: 1,
      yoffset: 14.5,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 381,
      x: 147.5,
      y: 440,
      width: 24.5,
      height: 39.5,
      xoffset: 0,
      yoffset: 1.5,
      page: 0,
      xadvance: 25,
    },
    {
      id: 382,
      x: 217.5,
      y: 465,
      width: 17.5,
      height: 30,
      xoffset: 1,
      yoffset: 11,
      page: 0,
      xadvance: 19.5,
    },
    {
      id: 383,
      x: 1,
      y: 363,
      width: 12.5,
      height: 31,
      xoffset: 5,
      yoffset: 11.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 731,
      x: 80,
      y: 384.5,
      width: 11,
      height: 9,
      xoffset: 4.5,
      yoffset: 36.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 48,
      x: 104.5,
      y: 441.5,
      width: 21,
      height: 28,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 49,
      x: 126.5,
      y: 461,
      width: 18,
      height: 27,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 22,
    },
    {
      id: 50,
      x: 104.5,
      y: 470.5,
      width: 18.5,
      height: 27,
      xoffset: 2,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 51,
      x: 173,
      y: 470,
      width: 18.5,
      height: 28,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 52,
      x: 192.5,
      y: 478,
      width: 20,
      height: 27,
      xoffset: 1,
      yoffset: 13,
      page: 0,
      xadvance: 22,
    },
    {
      id: 53,
      x: 145.5,
      y: 480.5,
      width: 18.5,
      height: 27,
      xoffset: 2,
      yoffset: 13.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 54,
      x: 124,
      y: 489,
      width: 19.5,
      height: 28,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 55,
      x: 165,
      y: 499,
      width: 19,
      height: 27,
      xoffset: 2,
      yoffset: 13.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 56,
      x: 144.5,
      y: 508.5,
      width: 19.5,
      height: 28,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 57,
      x: 236,
      y: 471,
      width: 19,
      height: 28,
      xoffset: 1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 732,
      x: 330,
      y: 66.5,
      width: 18,
      height: 6.5,
      xoffset: 2.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 733,
      x: 114.5,
      y: 57,
      width: 16.5,
      height: 7.5,
      xoffset: 3,
      yoffset: 11.5,
      page: 0,
      xadvance: 20,
    },
    {
      id: 8211,
      x: 175,
      y: 125.5,
      width: 19,
      height: 4,
      xoffset: 0,
      yoffset: 27.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 8212,
      x: 1,
      y: 401,
      width: 38,
      height: 4,
      xoffset: 0,
      yoffset: 27.5,
      page: 0,
      xadvance: 38,
    },
    {
      id: 8216,
      x: 358,
      y: 352,
      width: 7,
      height: 11,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 8217,
      x: 221.5,
      y: 216,
      width: 7,
      height: 11,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 8218,
      x: 165,
      y: 480.5,
      width: 7,
      height: 11,
      xoffset: 1,
      yoffset: 33.5,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 8220,
      x: 196.5,
      y: 152,
      width: 15,
      height: 11,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 16.5,
    },
    {
      id: 8221,
      x: 175,
      y: 130.5,
      width: 15,
      height: 11,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 16.5,
    },
    {
      id: 8222,
      x: 385.5,
      y: 26.5,
      width: 15,
      height: 11,
      xoffset: 1,
      yoffset: 33.5,
      page: 0,
      xadvance: 16.5,
    },
    {
      id: 8226,
      x: 460,
      y: 213.5,
      width: 11,
      height: 11,
      xoffset: 5.5,
      yoffset: 20.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 8230,
      x: 315,
      y: 474,
      width: 31.5,
      height: 7,
      xoffset: 3,
      yoffset: 33,
      page: 0,
      xadvance: 38,
    },
    {
      id: 8249,
      x: 378.5,
      y: 214.5,
      width: 8.5,
      height: 13.5,
      xoffset: 1,
      yoffset: 23.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 8250,
      x: 229.5,
      y: 177,
      width: 8.5,
      height: 13.5,
      xoffset: 1,
      yoffset: 23.5,
      page: 0,
      xadvance: 10,
    },
    {
      id: 8260,
      x: 1,
      y: 406,
      width: 29.5,
      height: 31,
      xoffset: 0,
      yoffset: 10,
      page: 0,
      xadvance: 29,
    },
    {
      id: 8364,
      x: 288,
      y: 476,
      width: 24,
      height: 27.5,
      xoffset: -2,
      yoffset: 13,
      page: 0,
      xadvance: 22.5,
    },
    {
      id: 8722,
      x: 213.5,
      y: 496,
      width: 18,
      height: 5,
      xoffset: 2,
      yoffset: 26,
      page: 0,
      xadvance: 22,
    },
    {
      id: 8725,
      x: 256,
      y: 498.5,
      width: 29.5,
      height: 31,
      xoffset: 0,
      yoffset: 10,
      page: 0,
      xadvance: 29,
    },
    {
      id: 33,
      x: 185,
      y: 499,
      width: 6.5,
      height: 28,
      xoffset: 2.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 11,
    },
    {
      id: 34,
      x: 409.5,
      y: 106.5,
      width: 9.5,
      height: 10.5,
      xoffset: 1.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 12,
    },
    {
      id: 35,
      x: 31.5,
      y: 421.5,
      width: 26.5,
      height: 27,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 26.5,
    },
    {
      id: 36,
      x: 165,
      y: 527,
      width: 19,
      height: 36,
      xoffset: 1.5,
      yoffset: 9,
      page: 0,
      xadvance: 22,
    },
    {
      id: 37,
      x: 1,
      y: 438,
      width: 25.5,
      height: 27.5,
      xoffset: 0.5,
      yoffset: 13,
      page: 0,
      xadvance: 26,
    },
    {
      id: 38,
      x: 213.5,
      y: 502,
      width: 24.5,
      height: 28,
      xoffset: 1,
      yoffset: 12.5,
      page: 0,
      xadvance: 25.5,
    },
    {
      id: 39,
      x: 295,
      y: 391,
      width: 3.5,
      height: 10.5,
      xoffset: 1.5,
      yoffset: 13.5,
      page: 0,
      xadvance: 6.5,
    },
    {
      id: 40,
      x: 503,
      y: 82,
      width: 8,
      height: 33,
      xoffset: 2.5,
      yoffset: 11,
      page: 0,
      xadvance: 12,
    },
    {
      id: 41,
      x: 239,
      y: 500,
      width: 8,
      height: 33,
      xoffset: 1.5,
      yoffset: 11,
      page: 0,
      xadvance: 12,
    },
    {
      id: 42,
      x: 351,
      y: 38.5,
      width: 13,
      height: 14.5,
      xoffset: 4.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 22,
    },
    {
      id: 43,
      x: 185,
      y: 528,
      width: 22,
      height: 22,
      xoffset: 4.5,
      yoffset: 17.5,
      page: 0,
      xadvance: 31,
    },
    {
      id: 44,
      x: 148,
      y: 223,
      width: 8.5,
      height: 11.5,
      xoffset: -1.5,
      yoffset: 33.5,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 45,
      x: 1,
      y: 395,
      width: 13.5,
      height: 5,
      xoffset: 1.5,
      yoffset: 27,
      page: 0,
      xadvance: 16,
    },
    {
      id: 46,
      x: 366,
      y: 316,
      width: 7,
      height: 7,
      xoffset: 1,
      yoffset: 33,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 47,
      x: 59,
      y: 445.5,
      width: 17,
      height: 28,
      xoffset: -1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 13.5,
    },
    {
      id: 58,
      x: 22,
      y: 134,
      width: 7,
      height: 18,
      xoffset: 1,
      yoffset: 22,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 59,
      x: 207.5,
      y: 278,
      width: 9,
      height: 23.5,
      xoffset: -1.5,
      yoffset: 22,
      page: 0,
      xadvance: 8.5,
    },
    {
      id: 61,
      x: 77,
      y: 471.5,
      width: 22,
      height: 11.5,
      xoffset: 4.5,
      yoffset: 23,
      page: 0,
      xadvance: 31,
    },
    {
      id: 63,
      x: 208,
      y: 531,
      width: 18,
      height: 28,
      xoffset: 0,
      yoffset: 13,
      page: 0,
      xadvance: 19,
    },
    {
      id: 64,
      x: 463.5,
      y: 386.5,
      width: 34,
      height: 32.5,
      xoffset: 1.5,
      yoffset: 13,
      page: 0,
      xadvance: 37,
    },
    {
      id: 32,
      x: 260.5,
      y: 29,
      width: 0,
      height: 0,
      xoffset: 0,
      yoffset: 39.5,
      page: 0,
      xadvance: 12,
    },
    {
      id: 91,
      x: 227,
      y: 531,
      width: 10,
      height: 33.5,
      xoffset: 2,
      yoffset: 12,
      page: 0,
      xadvance: 12,
    },
    {
      id: 92,
      x: 185,
      y: 551,
      width: 17,
      height: 28,
      xoffset: -1.5,
      yoffset: 12.5,
      page: 0,
      xadvance: 13.5,
    },
    {
      id: 93,
      x: 498.5,
      y: 386.5,
      width: 10,
      height: 33.5,
      xoffset: 0,
      yoffset: 12,
      page: 0,
      xadvance: 12,
    },
    {
      id: 94,
      x: 368.5,
      y: 125.5,
      width: 16,
      height: 9.5,
      xoffset: 3,
      yoffset: 13,
      page: 0,
      xadvance: 22,
    },
    {
      id: 95,
      x: 192.5,
      y: 506,
      width: 19,
      height: 4,
      xoffset: 0,
      yoffset: 44.5,
      page: 0,
      xadvance: 19,
    },
    {
      id: 96,
      x: 78,
      y: 133.5,
      width: 8,
      height: 8.5,
      xoffset: 4.5,
      yoffset: 10,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 123,
      x: 203,
      y: 560,
      width: 13,
      height: 34.5,
      xoffset: 3,
      yoffset: 13,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 124,
      x: 254,
      y: 197,
      width: 4,
      height: 35.5,
      xoffset: 7.5,
      yoffset: 11.5,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 125,
      x: 27.5,
      y: 449.5,
      width: 13,
      height: 34.5,
      xoffset: 2.5,
      yoffset: 13,
      page: 0,
      xadvance: 18.5,
    },
    {
      id: 126,
      x: 1,
      y: 466.5,
      width: 23.5,
      height: 8,
      xoffset: 3.5,
      yoffset: 24.5,
      page: 0,
      xadvance: 31,
    },
    {
      id: 32,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      xoffset: 3.5,
      yoffset: 24.5,
      page: 0,
      xadvance: 12,
    },
  ],
  assets = [
    [
      {
        name: "main_menu_popup_window/main_menu_btn",
        src: "main_menu_popup_window/main_menu_btn.png",
        frames: 1,
        layers: 1,
        width: 96,
        height: 26,
      },
      {
        name: "main_menu_popup_window/main_menu_btn_close",
        src: "main_menu_popup_window/main_menu_btn_close.png",
        frames: 3,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "main_menu_popup_window/main_menu_popup",
        src: "main_menu_popup_window/main_menu_popup.png",
        frames: 1,
        layers: 1,
        width: 168,
        height: 218,
      },
      {
        name: "hourglass",
        src: "hourglass.png",
        frames: 1,
        layers: 1,
        width: 100,
        height: 150,
      },
      {
        name: "fonts/font_white2",
        src: "fonts/font_white2.png",
        frames: 1,
        layers: 1,
        width: 512,
        height: 596,
      },
      {
        name: "flags/de",
        src: "flags/de.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "flags/en",
        src: "flags/en.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "flags/es",
        src: "flags/es.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "flags/it",
        src: "flags/it.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "flags/pt",
        src: "flags/pt.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "flags/ru",
        src: "flags/ru.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "flags/fr",
        src: "flags/fr.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 32,
      },
      {
        name: "main/back_main_menu",
        src: "main/back_main_menu.png",
        frames: 1,
        layers: 1,
        width: 570,
        height: 320,
      },
      {
        name: "main/logo_en",
        src: "main/logo_en.png",
        frames: 1,
        layers: 1,
        width: 244,
        height: 118,
      },
      {
        name: "main/logo_ru",
        src: "main/logo_ru.png",
        frames: 1,
        layers: 1,
        width: 278,
        height: 118,
      },
      {
        name: "main/main_menu_panel",
        src: "main/main_menu_panel.png",
        frames: 1,
        layers: 1,
        width: 186,
        height: 140,
      },
      {
        name: "main/checkbox",
        src: "main/checkbox.png",
        frames: 2,
        layers: 1,
        width: 16,
        height: 16,
      },
      {
        name: "main/option_send2",
        src: "main/option_send2.png",
        frames: 1,
        layers: 1,
        width: 182,
        height: 154,
      },
      {
        name: "buttons/button_1",
        src: "buttons/button_1.png",
        frames: 4,
        layers: 1,
        width: 20,
        height: 14,
      },
      {
        name: "buttons/button_2",
        src: "buttons/button_2.png",
        frames: 4,
        layers: 1,
        width: 24,
        height: 14,
      },
      {
        name: "buttons/button_3",
        src: "buttons/button_3.png",
        frames: 4,
        layers: 1,
        width: 40,
        height: 22,
      },
      {
        name: "buttons/button_4",
        src: "buttons/button_4.png",
        frames: 4,
        layers: 1,
        width: 50,
        height: 22,
      },
      {
        name: "buttons/button_5",
        src: "buttons/button_5.png",
        frames: 4,
        layers: 1,
        width: 64,
        height: 24,
      },
      {
        name: "buttons/button_6",
        src: "buttons/button_6.png",
        frames: 4,
        layers: 1,
        width: 84,
        height: 24,
      },
      {
        name: "buttons/button_star",
        src: "buttons/button_star.png",
        frames: 4,
        layers: 1,
        width: 44,
        height: 18,
      },
      {
        name: "buttons/button_no",
        src: "buttons/button_no.png",
        frames: 3,
        layers: 1,
        width: 48,
        height: 48,
      },
      {
        name: "buttons/button_ok",
        src: "buttons/button_ok.png",
        frames: 3,
        layers: 1,
        width: 48,
        height: 48,
      },
      {
        name: "buttons/but_star",
        src: "buttons/but_star.png",
        frames: 3,
        layers: 1,
        width: 34,
        height: 34,
      },
      {
        name: "buttons/button_upgrade_money",
        src: "buttons/button_upgrade_money.png",
        frames: 3,
        layers: 1,
        width: 34,
        height: 34,
      },
      {
        name: "buttons/btn_big_screen",
        src: "buttons/btn_big_screen.png",
        frames: 4,
        layers: 1,
        width: 26,
        height: 24,
      },
      {
        name: "buttons/btn_menu",
        src: "buttons/btn_menu.png",
        frames: 4,
        layers: 1,
        width: 26,
        height: 24,
      },
      {
        name: "buttons/more_games",
        src: "buttons/more_games.png",
        frames: 1,
        layers: 1,
        width: 50,
        height: 48,
      },
    ],
    [
      {
        name: "awards/award0",
        src: "awards/award0.png",
        frames: 6,
        layers: 2,
        width: 80,
        height: 126,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award1",
        src: "awards/award1.png",
        frames: 6,
        layers: 2,
        width: 110,
        height: 118,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award10",
        src: "awards/award10.png",
        frames: 6,
        layers: 2,
        width: 52,
        height: 114,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award11",
        src: "awards/award11.png",
        frames: 6,
        layers: 2,
        width: 88,
        height: 112,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award12",
        src: "awards/award12.png",
        frames: 6,
        layers: 2,
        width: 100,
        height: 110,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award13",
        src: "awards/award13.png",
        frames: 6,
        layers: 2,
        width: 70,
        height: 124,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award14",
        src: "awards/award14.png",
        frames: 6,
        layers: 2,
        width: 118,
        height: 98,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award15",
        src: "awards/award15.png",
        frames: 6,
        layers: 2,
        width: 96,
        height: 126,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award16",
        src: "awards/award16.png",
        frames: 6,
        layers: 2,
        width: 58,
        height: 104,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award17",
        src: "awards/award17.png",
        frames: 6,
        layers: 2,
        width: 54,
        height: 120,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award18",
        src: "awards/award18.png",
        frames: 6,
        layers: 2,
        width: 124,
        height: 112,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award2",
        src: "awards/award2.png",
        frames: 6,
        layers: 2,
        width: 94,
        height: 122,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award3",
        src: "awards/award3.png",
        frames: 6,
        layers: 2,
        width: 108,
        height: 120,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award4",
        src: "awards/award4.png",
        frames: 6,
        layers: 2,
        width: 46,
        height: 104,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award5",
        src: "awards/award5.png",
        frames: 6,
        layers: 2,
        width: 108,
        height: 122,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award6",
        src: "awards/award6.png",
        frames: 6,
        layers: 2,
        width: 68,
        height: 122,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award7",
        src: "awards/award7.png",
        frames: 6,
        layers: 2,
        width: 58,
        height: 116,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award8",
        src: "awards/award8.png",
        frames: 6,
        layers: 2,
        width: 76,
        height: 122,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award9",
        src: "awards/award9.png",
        frames: 6,
        layers: 2,
        width: 82,
        height: 122,
        spriteClass: "TilesSprite",
        properties: { framesCount: 12 },
      },
      {
        name: "awards/award_light0",
        src: "awards/award_light0.png",
        frames: 1,
        layers: 1,
        width: 45,
        height: 85,
      },
      {
        name: "awards/award_light1",
        src: "awards/award_light1.png",
        frames: 1,
        layers: 1,
        width: 81,
        height: 84,
      },
      {
        name: "awards/award_light10",
        src: "awards/award_light10.png",
        frames: 1,
        layers: 1,
        width: 38,
        height: 86,
      },
      {
        name: "awards/award_light11",
        src: "awards/award_light11.png",
        frames: 1,
        layers: 1,
        width: 48,
        height: 75,
      },
      {
        name: "awards/award_light12",
        src: "awards/award_light12.png",
        frames: 1,
        layers: 1,
        width: 67,
        height: 70,
      },
      {
        name: "awards/award_light13",
        src: "awards/award_light13.png",
        frames: 1,
        layers: 1,
        width: 51,
        height: 87,
      },
      {
        name: "awards/award_light14",
        src: "awards/award_light14.png",
        frames: 1,
        layers: 1,
        width: 64,
        height: 52,
      },
      {
        name: "awards/award_light15",
        src: "awards/award_light15.png",
        frames: 1,
        layers: 1,
        width: 49,
        height: 76,
      },
      {
        name: "awards/award_light16",
        src: "awards/award_light16.png",
        frames: 1,
        layers: 1,
        width: 45,
        height: 91,
      },
      {
        name: "awards/award_light17",
        src: "awards/award_light17.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 100,
      },
      {
        name: "awards/award_light18",
        src: "awards/award_light18.png",
        frames: 1,
        layers: 1,
        width: 74,
        height: 78,
      },
      {
        name: "awards/award_light2",
        src: "awards/award_light2.png",
        frames: 1,
        layers: 1,
        width: 90,
        height: 115,
      },
      {
        name: "awards/award_light3",
        src: "awards/award_light3.png",
        frames: 1,
        layers: 1,
        width: 45,
        height: 66,
      },
      {
        name: "awards/award_light4",
        src: "awards/award_light4.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 75,
      },
      {
        name: "awards/award_light5",
        src: "awards/award_light5.png",
        frames: 1,
        layers: 1,
        width: 47,
        height: 62,
      },
      {
        name: "awards/award_light6",
        src: "awards/award_light6.png",
        frames: 1,
        layers: 1,
        width: 48,
        height: 87,
      },
      {
        name: "awards/award_light7",
        src: "awards/award_light7.png",
        frames: 1,
        layers: 1,
        width: 44,
        height: 92,
      },
      {
        name: "awards/award_light8",
        src: "awards/award_light8.png",
        frames: 1,
        layers: 1,
        width: 50,
        height: 82,
      },
      {
        name: "awards/award_light9",
        src: "awards/award_light9.png",
        frames: 1,
        layers: 1,
        width: 60,
        height: 80,
      },
      {
        name: "awards/back_award_1",
        src: "awards/back_award_1.png",
        frames: 1,
        layers: 1,
        width: 570,
        height: 320,
      },
      {
        name: "awards/back_award_2",
        src: "awards/back_award_2.png",
        frames: 1,
        layers: 1,
        width: 480,
        height: 320,
      },
      {
        name: "awards/back_new_award",
        src: "awards/back_new_award.png",
        frames: 1,
        layers: 1,
        width: 169,
        height: 217,
      },
    ],
    [
      {
        name: "backs/back_level",
        src: "backs/back_level.jpg",
        frames: 1,
        layers: 1,
        width: 570,
        height: 320,
      },
      {
        name: "backs/back_lvlmap_complete",
        src: "backs/back_lvlmap_complete.jpg",
        frames: 1,
        layers: 1,
        width: 800,
        height: 600,
      },
      {
        name: "backs/place1",
        src: "backs/place1.png",
        frames: 1,
        layers: 1,
        width: 119,
        height: 53,
      },
      {
        name: "backs/place2",
        src: "backs/place2.png",
        frames: 1,
        layers: 1,
        width: 91,
        height: 69,
      },
      {
        name: "backs/place3",
        src: "backs/place3.png",
        frames: 1,
        layers: 1,
        width: 115,
        height: 77,
      },
      {
        name: "backs/place4",
        src: "backs/place4.png",
        frames: 1,
        layers: 1,
        width: 119,
        height: 59,
      },
      {
        name: "backs/place5",
        src: "backs/place5.png",
        frames: 1,
        layers: 1,
        width: 118,
        height: 76,
      },
      {
        name: "backs/place6",
        src: "backs/place6.png",
        frames: 1,
        layers: 1,
        width: 115,
        height: 82,
      },
      {
        name: "misc/grass_new",
        src: "misc/grass_new.png",
        frames: 15,
        layers: 1,
        width: 48,
        height: 40,
      },
      {
        name: "misc/life",
        src: "misc/life.png",
        frames: 25,
        layers: 1,
        width: 20,
        height: 4,
      },
      {
        name: "misc/shadow_usual",
        src: "misc/shadow_usual.png",
        frames: 10,
        layers: 1,
        width: 34,
        height: 22,
      },
      {
        name: "misc/water_drops",
        src: "misc/water_drops.png",
        frames: 21,
        layers: 1,
        width: 38,
        height: 36,
      },
      {
        name: "misc/indicator_house",
        src: "misc/indicator_house.png",
        frames: 27,
        layers: 1,
        width: 6,
        height: 26,
      },
      {
        name: "misc/indicator_water",
        src: "misc/indicator_water.png",
        frames: 27,
        layers: 1,
        width: 6,
        height: 26,
      },
      {
        name: "misc/main_line",
        src: "misc/main_line.png",
        frames: 1,
        layers: 1,
        width: 4,
        height: 26,
      },
      {
        name: "misc/numbers_gold",
        src: "misc/numbers_gold.png",
        frames: 12,
        layers: 1,
        width: 8,
        height: 10,
      },
      {
        name: "misc/numbers_silver",
        src: "misc/numbers_silver.png",
        frames: 12,
        layers: 1,
        width: 8,
        height: 10,
      },
      {
        name: "misc/red_arrow",
        src: "misc/red_arrow.png",
        frames: 8,
        layers: 1,
        width: 26,
        height: 26,
      },
      {
        name: "misc/parachute",
        src: "misc/parachute.png",
        frames: 1,
        layers: 1,
        width: 38,
        height: 47,
      },
      {
        name: "avia/avia_box1",
        src: "avia/avia_box1.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 14,
      },
      {
        name: "avia/avia_box2",
        src: "avia/avia_box2.png",
        frames: 1,
        layers: 1,
        width: 49,
        height: 14,
      },
      {
        name: "avia/avia_box3",
        src: "avia/avia_box3.png",
        frames: 1,
        layers: 1,
        width: 84,
        height: 14,
      },
      {
        name: "avia/avia_box4",
        src: "avia/avia_box4.png",
        frames: 1,
        layers: 1,
        width: 119,
        height: 14,
      },
      {
        name: "avia/avia_menu",
        src: "avia/avia_menu.png",
        frames: 1,
        layers: 1,
        width: 198,
        height: 285,
      },
      {
        name: "avia/avia_menu_plane1",
        src: "avia/avia_menu_plane1.png",
        frames: 1,
        layers: 1,
        width: 167,
        height: 86,
      },
      {
        name: "avia/avia_menu_plane2",
        src: "avia/avia_menu_plane2.png",
        frames: 1,
        layers: 1,
        width: 164,
        height: 76,
      },
      {
        name: "avia/avia_menu_plane3",
        src: "avia/avia_menu_plane3.png",
        frames: 1,
        layers: 1,
        width: 164,
        height: 89,
      },
      {
        name: "avia/avia_menu_plane4",
        src: "avia/avia_menu_plane4.png",
        frames: 1,
        layers: 1,
        width: 155,
        height: 66,
      },
      {
        name: "avia/back_avia",
        src: "avia/back_avia.png",
        frames: 1,
        layers: 1,
        width: 570,
        height: 320,
      },
      {
        name: "depot/depot_menu_coin1",
        src: "depot/depot_menu_coin1.png",
        frames: 1,
        layers: 1,
        width: 14,
        height: 14,
      },
      {
        name: "depot/depot_menu_coin2",
        src: "depot/depot_menu_coin2.png",
        frames: 1,
        layers: 1,
        width: 11,
        height: 11,
      },
      {
        name: "depot/depot_menu_numbers",
        src: "depot/depot_menu_numbers.png",
        frames: 11,
        layers: 1,
        width: 6,
        height: 8,
      },
      {
        name: "depot/depot_menu_x",
        src: "depot/depot_menu_x.png",
        frames: 1,
        layers: 1,
        width: 7,
        height: 8,
      },
      {
        name: "depot/new_depot_back",
        src: "depot/new_depot_back.png",
        frames: 1,
        layers: 1,
        width: 480,
        height: 276,
      },
      {
        name: "depot/new_depot_header",
        src: "depot/new_depot_header.png",
        frames: 2,
        layers: 1,
        width: 242,
        height: 38,
      },
      {
        name: "depot/new_depot_menu_car1",
        src: "depot/new_depot_menu_car1.png",
        frames: 1,
        layers: 1,
        width: 224,
        height: 201,
      },
      {
        name: "depot/new_depot_menu_car2",
        src: "depot/new_depot_menu_car2.png",
        frames: 1,
        layers: 1,
        width: 221,
        height: 184,
      },
      {
        name: "depot/new_depot_menu_car3",
        src: "depot/new_depot_menu_car3.png",
        frames: 1,
        layers: 1,
        width: 224,
        height: 200,
      },
      {
        name: "depot/new_depot_menu_car4",
        src: "depot/new_depot_menu_car4.png",
        frames: 1,
        layers: 1,
        width: 224,
        height: 198,
      },
      {
        name: "depot/icon_bear1",
        src: "depot/icon_bear1.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_bear2",
        src: "depot/icon_bear2.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_bear3",
        src: "depot/icon_bear3.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_bear4",
        src: "depot/icon_bear4.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_butter",
        src: "depot/icon_butter.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_cake",
        src: "depot/icon_cake.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_cheese",
        src: "depot/icon_cheese.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_cheese_ferment",
        src: "depot/icon_cheese_ferment.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_chicken",
        src: "depot/icon_chicken.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_cow",
        src: "depot/icon_cow.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_dress",
        src: "depot/icon_dress.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_dried_egg",
        src: "depot/icon_dried_egg.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_egg",
        src: "depot/icon_egg.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_fan",
        src: "depot/icon_fan.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_feather",
        src: "depot/icon_feather.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_flourycake",
        src: "depot/icon_flourycake.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_hat",
        src: "depot/icon_hat.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_hat_feather",
        src: "depot/icon_hat_feather.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_meat",
        src: "depot/icon_meat.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_meatpacket",
        src: "depot/icon_meatpacket.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_meatspice",
        src: "depot/icon_meatspice.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_milk",
        src: "depot/icon_milk.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_ostrich",
        src: "depot/icon_ostrich.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_packet",
        src: "depot/icon_packet.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_pig",
        src: "depot/icon_pig.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_powder",
        src: "depot/icon_powder.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_sourcream",
        src: "depot/icon_sourcream.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_steak",
        src: "depot/icon_steak.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "depot/icon_textile",
        src: "depot/icon_textile.png",
        frames: 1,
        layers: 1,
        width: 21,
        height: 21,
      },
      {
        name: "gags/hatch_bear",
        src: "gags/hatch_bear.png",
        frames: 23,
        layers: 1,
        width: 70,
        height: 42,
      },
      {
        name: "gags/knitting_chicken",
        src: "gags/knitting_chicken.png",
        frames: 24,
        layers: 1,
        width: 36,
        height: 30,
      },
      {
        name: "gags/map_cat_chicken",
        src: "gags/map_cat_chicken.png",
        frames: 12,
        layers: 2,
        width: 118,
        height: 56,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/map_cat_pig",
        src: "gags/map_cat_pig.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 96,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "gags/map_chicken",
        src: "gags/map_chicken.png",
        frames: 8,
        layers: 3,
        width: 68,
        height: 96,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/map_cow",
        src: "gags/map_cow.png",
        frames: 8,
        layers: 3,
        width: 88,
        height: 100,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/map_ostrich",
        src: "gags/map_ostrich.png",
        frames: 8,
        layers: 3,
        width: 62,
        height: 100,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/map_panda",
        src: "gags/map_panda.png",
        frames: 12,
        layers: 2,
        width: 98,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/playing_pig",
        src: "gags/playing_pig.png",
        frames: 16,
        layers: 1,
        width: 54,
        height: 58,
      },
      {
        name: "gags/running_cat",
        src: "gags/running_cat.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "gags/saltatory_cow",
        src: "gags/saltatory_cow.png",
        frames: 12,
        layers: 2,
        width: 92,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/saltatory_ostrich",
        src: "gags/saltatory_ostrich.png",
        frames: 12,
        layers: 2,
        width: 40,
        height: 68,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/side_white_bear",
        src: "gags/side_white_bear.png",
        frames: 12,
        layers: 2,
        width: 90,
        height: 70,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/tick_32_hit",
        src: "gags/tick_32_hit.png",
        frames: 1,
        layers: 1,
        width: 16,
        height: 16,
      },
      {
        name: "gags/top_white_bear",
        src: "gags/top_white_bear.png",
        frames: 12,
        layers: 2,
        width: 98,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "gags/wall_bear",
        src: "gags/wall_bear.png",
        frames: 12,
        layers: 2,
        width: 76,
        height: 54,
        spriteClass: "TilesSprite",
        properties: { framesCount: 24 },
      },
      {
        name: "effects/dust_house",
        src: "effects/dust_house.png",
        frames: 10,
        layers: 1,
        width: 100,
        height: 24,
      },
      {
        name: "effects/dust_pet",
        src: "effects/dust_pet.png",
        frames: 10,
        layers: 1,
        width: 50,
        height: 24,
      },
      {
        name: "help/help_page1",
        src: "help/help_page1.png",
        frames: 1,
        layers: 1,
        width: 396,
        height: 296,
      },
      {
        name: "help/help_page2",
        src: "help/help_page2.png",
        frames: 1,
        layers: 1,
        width: 396,
        height: 296,
      },
      {
        name: "help/tips_block",
        src: "help/tips_block.png",
        frames: 1,
        layers: 1,
        width: 151,
        height: 100,
      },
      {
        name: "help/tips_main",
        src: "help/tips_main.png",
        frames: 1,
        layers: 1,
        width: 156,
        height: 82,
      },
      {
        name: "help/tips_main1",
        src: "help/tips_main1.png",
        frames: 1,
        layers: 1,
        width: 154,
        height: 79,
      },
      {
        name: "help/tips_map0",
        src: "help/tips_map0.png",
        frames: 1,
        layers: 1,
        width: 134,
        height: 60,
      },
      {
        name: "help/tips_map1",
        src: "help/tips_map1.png",
        frames: 1,
        layers: 1,
        width: 134,
        height: 89,
      },
      {
        name: "help/tips_map2",
        src: "help/tips_map2.png",
        frames: 1,
        layers: 1,
        width: 134,
        height: 118,
      },
      {
        name: "help/tips_simple",
        src: "help/tips_simple.png",
        frames: 1,
        layers: 1,
        width: 145,
        height: 104,
      },
      {
        name: "help/water_tip",
        src: "help/water_tip.png",
        frames: 1,
        layers: 1,
        width: 171,
        height: 136,
      },
      {
        name: "help/tips_simple_down",
        src: "help/tips_simple_down.png",
        frames: 1,
        layers: 1,
        width: 182,
        height: 140,
      },
      {
        name: "help/tips_simple_left",
        src: "help/tips_simple_left.png",
        frames: 1,
        layers: 1,
        width: 182,
        height: 140,
      },
      {
        name: "help/tips_simple_right",
        src: "help/tips_simple_right.png",
        frames: 1,
        layers: 1,
        width: 182,
        height: 140,
      },
      {
        name: "help/tips_simple_up",
        src: "help/tips_simple_up.png",
        frames: 1,
        layers: 1,
        width: 182,
        height: 140,
      },
      {
        name: "houses/butter/house_butter1",
        src: "houses/butter/house_butter1.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/butter/house_butter2",
        src: "houses/butter/house_butter2.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 80,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/butter/house_butter3",
        src: "houses/butter/house_butter3.png",
        frames: 9,
        layers: 2,
        width: 84,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/butter/house_butter4",
        src: "houses/butter/house_butter4.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 80,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/butter/house_butter5",
        src: "houses/butter/house_butter5.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 82,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/cage/cage1",
        src: "houses/cage/cage1.png",
        frames: 8,
        layers: 1,
        width: 52,
        height: 66,
      },
      {
        name: "houses/cage/cage2",
        src: "houses/cage/cage2.png",
        frames: 8,
        layers: 1,
        width: 56,
        height: 72,
      },
      {
        name: "houses/cage/cage3",
        src: "houses/cage/cage3.png",
        frames: 8,
        layers: 1,
        width: 58,
        height: 72,
      },
      {
        name: "houses/cage/cage4",
        src: "houses/cage/cage4.png",
        frames: 8,
        layers: 1,
        width: 58,
        height: 70,
      },
      {
        name: "houses/cage/cage_break1",
        src: "houses/cage/cage_break1.png",
        frames: 8,
        layers: 2,
        width: 66,
        height: 72,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cage/cage_break2",
        src: "houses/cage/cage_break2.png",
        frames: 8,
        layers: 2,
        width: 70,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cage/cage_break3",
        src: "houses/cage/cage_break3.png",
        frames: 8,
        layers: 2,
        width: 70,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cage/cage_break4",
        src: "houses/cage/cage_break4.png",
        frames: 8,
        layers: 2,
        width: 70,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cake/house_cake1",
        src: "houses/cake/house_cake1.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cake/house_cake2",
        src: "houses/cake/house_cake2.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cake/house_cake3",
        src: "houses/cake/house_cake3.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 86,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cake/house_cake4",
        src: "houses/cake/house_cake4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cake/house_cake5",
        src: "houses/cake/house_cake5.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/carnivaldress/house_carnivaldress1",
        src: "houses/carnivaldress/house_carnivaldress1.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/carnivaldress/house_carnivaldress2",
        src: "houses/carnivaldress/house_carnivaldress2.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 88,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/carnivaldress/house_carnivaldress3",
        src: "houses/carnivaldress/house_carnivaldress3.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/carnivaldress/house_carnivaldress4",
        src: "houses/carnivaldress/house_carnivaldress4.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 80,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/carnivaldress/house_carnivaldress5",
        src: "houses/carnivaldress/house_carnivaldress5.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 82,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cheese/house_cheese1",
        src: "houses/cheese/house_cheese1.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cheese/house_cheese2",
        src: "houses/cheese/house_cheese2.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cheese/house_cheese3",
        src: "houses/cheese/house_cheese3.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cheese/house_cheese4",
        src: "houses/cheese/house_cheese4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/cheese/house_cheese5",
        src: "houses/cheese/house_cheese5.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/dried_egg/house_dried_egg1",
        src: "houses/dried_egg/house_dried_egg1.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/dried_egg/house_dried_egg2",
        src: "houses/dried_egg/house_dried_egg2.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/dried_egg/house_dried_egg3",
        src: "houses/dried_egg/house_dried_egg3.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/dried_egg/house_dried_egg4",
        src: "houses/dried_egg/house_dried_egg4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/dried_egg/house_dried_egg5",
        src: "houses/dried_egg/house_dried_egg5.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/fan/house_fan1",
        src: "houses/fan/house_fan1.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/fan/house_fan2",
        src: "houses/fan/house_fan2.png",
        frames: 9,
        layers: 2,
        width: 92,
        height: 88,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/fan/house_fan3",
        src: "houses/fan/house_fan3.png",
        frames: 9,
        layers: 2,
        width: 84,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/fan/house_fan4",
        src: "houses/fan/house_fan4.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 80,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/fan/house_fan5",
        src: "houses/fan/house_fan5.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 82,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/flourycake/house_flourycake1",
        src: "houses/flourycake/house_flourycake1.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 82,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/flourycake/house_flourycake2",
        src: "houses/flourycake/house_flourycake2.png",
        frames: 9,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/flourycake/house_flourycake3",
        src: "houses/flourycake/house_flourycake3.png",
        frames: 9,
        layers: 2,
        width: 86,
        height: 84,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/flourycake/house_flourycake4",
        src: "houses/flourycake/house_flourycake4.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 86,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/flourycake/house_flourycake5",
        src: "houses/flourycake/house_flourycake5.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 82,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/meat/house_meat1",
        src: "houses/meat/house_meat1.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meat/house_meat2",
        src: "houses/meat/house_meat2.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meat/house_meat3",
        src: "houses/meat/house_meat3.png",
        frames: 8,
        layers: 2,
        width: 84,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meat/house_meat4",
        src: "houses/meat/house_meat4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meat/house_meat5",
        src: "houses/meat/house_meat5.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meatpacket/house_meatpacket1",
        src: "houses/meatpacket/house_meatpacket1.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/meatpacket/house_meatpacket2",
        src: "houses/meatpacket/house_meatpacket2.png",
        frames: 9,
        layers: 2,
        width: 92,
        height: 88,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/meatpacket/house_meatpacket3",
        src: "houses/meatpacket/house_meatpacket3.png",
        frames: 9,
        layers: 2,
        width: 84,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/meatpacket/house_meatpacket4",
        src: "houses/meatpacket/house_meatpacket4.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 80,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/meatpacket/house_meatpacket5",
        src: "houses/meatpacket/house_meatpacket5.png",
        frames: 9,
        layers: 2,
        width: 88,
        height: 82,
        spriteClass: "TilesSprite",
        properties: { framesCount: 17 },
      },
      {
        name: "houses/meatspice/house_meatspice1",
        src: "houses/meatspice/house_meatspice1.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meatspice/house_meatspice2",
        src: "houses/meatspice/house_meatspice2.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meatspice/house_meatspice3",
        src: "houses/meatspice/house_meatspice3.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meatspice/house_meatspice4",
        src: "houses/meatspice/house_meatspice4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/meatspice/house_meatspice5",
        src: "houses/meatspice/house_meatspice5.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/plumehat/house_plumehat1",
        src: "houses/plumehat/house_plumehat1.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/plumehat/house_plumehat2",
        src: "houses/plumehat/house_plumehat2.png",
        frames: 8,
        layers: 2,
        width: 84,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/plumehat/house_plumehat3",
        src: "houses/plumehat/house_plumehat3.png",
        frames: 8,
        layers: 2,
        width: 84,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/plumehat/house_plumehat4",
        src: "houses/plumehat/house_plumehat4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/plumehat/house_plumehat5",
        src: "houses/plumehat/house_plumehat5.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/sklad/sklad_1",
        src: "houses/sklad/sklad_1.png",
        frames: 1,
        layers: 1,
        width: 82,
        height: 66,
      },
      {
        name: "houses/sklad/sklad_2",
        src: "houses/sklad/sklad_2.png",
        frames: 1,
        layers: 1,
        width: 84,
        height: 70,
      },
      {
        name: "houses/sklad/sklad_3",
        src: "houses/sklad/sklad_3.png",
        frames: 1,
        layers: 1,
        width: 84,
        height: 72,
      },
      {
        name: "houses/sklad/sklad_4",
        src: "houses/sklad/sklad_4.png",
        frames: 1,
        layers: 1,
        width: 85,
        height: 71,
      },
      {
        name: "houses/sourcream/house_sourcream1",
        src: "houses/sourcream/house_sourcream1.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 78,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/sourcream/house_sourcream2",
        src: "houses/sourcream/house_sourcream2.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/sourcream/house_sourcream3",
        src: "houses/sourcream/house_sourcream3.png",
        frames: 8,
        layers: 2,
        width: 86,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/sourcream/house_sourcream4",
        src: "houses/sourcream/house_sourcream4.png",
        frames: 8,
        layers: 2,
        width: 92,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/sourcream/house_sourcream5",
        src: "houses/sourcream/house_sourcream5.png",
        frames: 8,
        layers: 2,
        width: 90,
        height: 92,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/well_step/house_well_step_1",
        src: "houses/well_step/house_well_step_1.png",
        frames: 16,
        layers: 1,
        width: 64,
        height: 50,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/well_step/house_well_step_2",
        src: "houses/well_step/house_well_step_2.png",
        frames: 16,
        layers: 1,
        width: 66,
        height: 60,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/well_step/house_well_step_3",
        src: "houses/well_step/house_well_step_3.png",
        frames: 8,
        layers: 2,
        width: 88,
        height: 76,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/well_step/house_well_step_4",
        src: "houses/well_step/house_well_step_4.png",
        frames: 8,
        layers: 2,
        width: 84,
        height: 74,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "houses/places/place_butter",
        src: "houses/places/place_butter.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_cake",
        src: "houses/places/place_cake.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_carnivaldress",
        src: "houses/places/place_carnivaldress.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_cheese",
        src: "houses/places/place_cheese.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_dried_egg",
        src: "houses/places/place_dried_egg.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_fan",
        src: "houses/places/place_fan.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_flourycake",
        src: "houses/places/place_flourycake.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_meat",
        src: "houses/places/place_meat.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_meatpacket",
        src: "houses/places/place_meatpacket.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_meatspice",
        src: "houses/places/place_meatspice.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_plumehat",
        src: "houses/places/place_plumehat.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "houses/places/place_sourcream",
        src: "houses/places/place_sourcream.png",
        frames: 1,
        layers: 1,
        width: 30,
        height: 49,
      },
      {
        name: "map/node_complete",
        src: "map/node_complete.png",
        frames: 3,
        layers: 1,
        width: 38,
        height: 38,
      },
      {
        name: "map/node_gold",
        src: "map/node_gold.png",
        frames: 3,
        layers: 1,
        width: 38,
        height: 38,
      },
      {
        name: "map/node_new",
        src: "map/node_new.png",
        frames: 3,
        layers: 1,
        width: 38,
        height: 38,
      },
      {
        name: "map/node_silver",
        src: "map/node_silver.png",
        frames: 3,
        layers: 1,
        width: 38,
        height: 38,
      },
      {
        name: "map/node_stop",
        src: "map/node_stop.png",
        frames: 3,
        layers: 1,
        width: 38,
        height: 38,
      },
      {
        name: "pets/cats/cat1_down",
        src: "pets/cats/cat1_down.png",
        frames: 16,
        layers: 1,
        width: 22,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat1_left",
        src: "pets/cats/cat1_left.png",
        frames: 16,
        layers: 1,
        width: 36,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat1_left_down",
        src: "pets/cats/cat1_left_down.png",
        frames: 16,
        layers: 1,
        width: 28,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat1_left_up",
        src: "pets/cats/cat1_left_up.png",
        frames: 16,
        layers: 1,
        width: 30,
        height: 36,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat1_up",
        src: "pets/cats/cat1_up.png",
        frames: 16,
        layers: 1,
        width: 22,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat2_down",
        src: "pets/cats/cat2_down.png",
        frames: 16,
        layers: 1,
        width: 30,
        height: 42,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat2_left",
        src: "pets/cats/cat2_left.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 36,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat2_left_down",
        src: "pets/cats/cat2_left_down.png",
        frames: 16,
        layers: 1,
        width: 30,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat2_left_up",
        src: "pets/cats/cat2_left_up.png",
        frames: 16,
        layers: 1,
        width: 30,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat2_up",
        src: "pets/cats/cat2_up.png",
        frames: 16,
        layers: 1,
        width: 30,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat3_down",
        src: "pets/cats/cat3_down.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 54,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat3_left",
        src: "pets/cats/cat3_left.png",
        frames: 16,
        layers: 1,
        width: 44,
        height: 46,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat3_left_down",
        src: "pets/cats/cat3_left_down.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 52,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat3_left_up",
        src: "pets/cats/cat3_left_up.png",
        frames: 16,
        layers: 1,
        width: 38,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat3_up",
        src: "pets/cats/cat3_up.png",
        frames: 16,
        layers: 1,
        width: 36,
        height: 46,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat4_down",
        src: "pets/cats/cat4_down.png",
        frames: 16,
        layers: 1,
        width: 36,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat4_left",
        src: "pets/cats/cat4_left.png",
        frames: 16,
        layers: 1,
        width: 38,
        height: 32,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat4_left_down",
        src: "pets/cats/cat4_left_down.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat4_left_up",
        src: "pets/cats/cat4_left_up.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 32,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cats/cat4_up",
        src: "pets/cats/cat4_up.png",
        frames: 16,
        layers: 1,
        width: 36,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog1_down",
        src: "pets/dogs/dog1_down.png",
        frames: 16,
        layers: 1,
        width: 28,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog1_lay",
        src: "pets/dogs/dog1_lay.png",
        frames: 16,
        layers: 1,
        width: 34,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog1_left",
        src: "pets/dogs/dog1_left.png",
        frames: 16,
        layers: 1,
        width: 38,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog1_left_down",
        src: "pets/dogs/dog1_left_down.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog1_left_up",
        src: "pets/dogs/dog1_left_up.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog1_up",
        src: "pets/dogs/dog1_up.png",
        frames: 16,
        layers: 1,
        width: 28,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog2_down",
        src: "pets/dogs/dog2_down.png",
        frames: 16,
        layers: 1,
        width: 42,
        height: 48,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog2_lay",
        src: "pets/dogs/dog2_lay.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog2_left",
        src: "pets/dogs/dog2_left.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 42,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog2_left_down",
        src: "pets/dogs/dog2_left_down.png",
        frames: 16,
        layers: 1,
        width: 48,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog2_left_up",
        src: "pets/dogs/dog2_left_up.png",
        frames: 16,
        layers: 1,
        width: 46,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog2_up",
        src: "pets/dogs/dog2_up.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog3_down",
        src: "pets/dogs/dog3_down.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog3_lay",
        src: "pets/dogs/dog3_lay.png",
        frames: 16,
        layers: 1,
        width: 48,
        height: 36,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog3_left",
        src: "pets/dogs/dog3_left.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 36,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog3_left_down",
        src: "pets/dogs/dog3_left_down.png",
        frames: 16,
        layers: 1,
        width: 48,
        height: 34,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog3_left_up",
        src: "pets/dogs/dog3_left_up.png",
        frames: 16,
        layers: 1,
        width: 48,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog3_up",
        src: "pets/dogs/dog3_up.png",
        frames: 16,
        layers: 1,
        width: 40,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog4_down",
        src: "pets/dogs/dog4_down.png",
        frames: 16,
        layers: 1,
        width: 46,
        height: 42,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog4_lay",
        src: "pets/dogs/dog4_lay.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog4_left",
        src: "pets/dogs/dog4_left.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog4_left_down",
        src: "pets/dogs/dog4_left_down.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 44,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog4_left_up",
        src: "pets/dogs/dog4_left_up.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 48,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/dogs/dog4_up",
        src: "pets/dogs/dog4_up.png",
        frames: 16,
        layers: 1,
        width: 46,
        height: 46,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_death",
        src: "pets/pig/pig_death.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 36,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_down",
        src: "pets/pig/pig_down.png",
        frames: 16,
        layers: 1,
        width: 28,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_eat",
        src: "pets/pig/pig_eat.png",
        frames: 16,
        layers: 1,
        width: 46,
        height: 36,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_left",
        src: "pets/pig/pig_left.png",
        frames: 16,
        layers: 1,
        width: 52,
        height: 32,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_left_down",
        src: "pets/pig/pig_left_down.png",
        frames: 16,
        layers: 1,
        width: 42,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_left_up",
        src: "pets/pig/pig_left_up.png",
        frames: 16,
        layers: 1,
        width: 42,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/pig/pig_up",
        src: "pets/pig/pig_up.png",
        frames: 16,
        layers: 1,
        width: 30,
        height: 40,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_death",
        src: "pets/chicken/chicken_death.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 28,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_down",
        src: "pets/chicken/chicken_down.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_eat",
        src: "pets/chicken/chicken_eat.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 26,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_left",
        src: "pets/chicken/chicken_left.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_left_down",
        src: "pets/chicken/chicken_left_down.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 28,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_left_up",
        src: "pets/chicken/chicken_left_up.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/chicken/chicken_up",
        src: "pets/chicken/chicken_up.png",
        frames: 16,
        layers: 1,
        width: 32,
        height: 30,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_death",
        src: "pets/cow/cow_death.png",
        frames: 16,
        layers: 1,
        width: 74,
        height: 54,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_down",
        src: "pets/cow/cow_down.png",
        frames: 16,
        layers: 1,
        width: 58,
        height: 56,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_down_left",
        src: "pets/cow/cow_down_left.png",
        frames: 16,
        layers: 1,
        width: 76,
        height: 54,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_eat",
        src: "pets/cow/cow_eat.png",
        frames: 16,
        layers: 1,
        width: 74,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_left",
        src: "pets/cow/cow_left.png",
        frames: 16,
        layers: 1,
        width: 76,
        height: 50,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_up",
        src: "pets/cow/cow_up.png",
        frames: 16,
        layers: 1,
        width: 58,
        height: 62,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/cow/cow_up_left",
        src: "pets/cow/cow_up_left.png",
        frames: 16,
        layers: 1,
        width: 74,
        height: 60,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear1_down",
        src: "pets/bears/bear1_down.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 50,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear1_left",
        src: "pets/bears/bear1_left.png",
        frames: 16,
        layers: 1,
        width: 48,
        height: 50,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear1_left_down",
        src: "pets/bears/bear1_left_down.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 50,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear1_left_up",
        src: "pets/bears/bear1_left_up.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 50,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear1_up",
        src: "pets/bears/bear1_up.png",
        frames: 16,
        layers: 1,
        width: 50,
        height: 48,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear2_down",
        src: "pets/bears/bear2_down.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 52,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear2_left",
        src: "pets/bears/bear2_left.png",
        frames: 16,
        layers: 1,
        width: 56,
        height: 60,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear2_left_down",
        src: "pets/bears/bear2_left_down.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 58,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear2_left_up",
        src: "pets/bears/bear2_left_up.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 60,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear2_up",
        src: "pets/bears/bear2_up.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 52,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear4_down",
        src: "pets/bears/bear3_down.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 56,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear4_left",
        src: "pets/bears/bear3_left.png",
        frames: 16,
        layers: 1,
        width: 60,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear4_left_down",
        src: "pets/bears/bear3_left_down.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 60,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear4_left_up",
        src: "pets/bears/bear3_left_up.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear4_up",
        src: "pets/bears/bear3_up.png",
        frames: 16,
        layers: 1,
        width: 68,
        height: 56,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear3_down",
        src: "pets/bears/bear4_down.png",
        frames: 16,
        layers: 1,
        width: 82,
        height: 54,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear3_left",
        src: "pets/bears/bear4_left.png",
        frames: 8,
        layers: 2,
        width: 64,
        height: 66,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear3_left_down",
        src: "pets/bears/bear4_left_down.png",
        frames: 16,
        layers: 1,
        width: 74,
        height: 62,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear3_left_up",
        src: "pets/bears/bear4_left_up.png",
        frames: 8,
        layers: 2,
        width: 76,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear3_up",
        src: "pets/bears/bear4_up.png",
        frames: 16,
        layers: 1,
        width: 82,
        height: 58,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear1_caged",
        src: "pets/bears/bear1_caged.png",
        frames: 16,
        layers: 1,
        width: 38,
        height: 38,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear2_caged",
        src: "pets/bears/bear2_caged.png",
        frames: 16,
        layers: 1,
        width: 46,
        height: 46,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear3_caged",
        src: "pets/bears/bear3_caged.png",
        frames: 16,
        layers: 1,
        width: 58,
        height: 58,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/bears/bear4_caged",
        src: "pets/bears/bear4_caged.png",
        frames: 8,
        layers: 2,
        width: 62,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_death",
        src: "pets/ostrich/ostrich_death.png",
        frames: 8,
        layers: 2,
        width: 56,
        height: 68,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_down",
        src: "pets/ostrich/ostrich_down.png",
        frames: 8,
        layers: 2,
        width: 30,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_eat",
        src: "pets/ostrich/ostrich_eat.png",
        frames: 8,
        layers: 2,
        width: 48,
        height: 66,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_left",
        src: "pets/ostrich/ostrich_left.png",
        frames: 8,
        layers: 2,
        width: 36,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_left_down",
        src: "pets/ostrich/ostrich_left_down.png",
        frames: 8,
        layers: 2,
        width: 36,
        height: 64,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_left_up",
        src: "pets/ostrich/ostrich_left_up.png",
        frames: 8,
        layers: 2,
        width: 34,
        height: 68,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "pets/ostrich/ostrich_up",
        src: "pets/ostrich/ostrich_up.png",
        frames: 8,
        layers: 2,
        width: 30,
        height: 68,
        spriteClass: "TilesSprite",
        properties: { framesCount: 16 },
      },
      {
        name: "products/butter",
        src: "products/butter.png",
        frames: 2,
        layers: 1,
        width: 50,
        height: 42,
      },
      {
        name: "products/cake",
        src: "products/cake.png",
        frames: 2,
        layers: 1,
        width: 52,
        height: 30,
      },
      {
        name: "products/cheese",
        src: "products/cheese.png",
        frames: 2,
        layers: 1,
        width: 48,
        height: 42,
      },
      {
        name: "products/cheese_ferment",
        src: "products/cheese_ferment.png",
        frames: 2,
        layers: 1,
        width: 28,
        height: 52,
      },
      {
        name: "products/dress",
        src: "products/dress.png",
        frames: 2,
        layers: 1,
        width: 40,
        height: 56,
      },
      {
        name: "products/dried_egg",
        src: "products/dried_egg.png",
        frames: 2,
        layers: 1,
        width: 40,
        height: 48,
      },
      {
        name: "products/egg",
        src: "products/egg.png",
        frames: 2,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "products/egg_ostrich",
        src: "products/egg_ostrich.png",
        frames: 2,
        layers: 1,
        width: 34,
        height: 40,
      },
      {
        name: "products/fan",
        src: "products/fan.png",
        frames: 2,
        layers: 1,
        width: 54,
        height: 36,
      },
      {
        name: "products/feather",
        src: "products/feather.png",
        frames: 2,
        layers: 1,
        width: 52,
        height: 36,
      },
      {
        name: "products/flourycake",
        src: "products/flourycake.png",
        frames: 2,
        layers: 1,
        width: 56,
        height: 42,
      },
      {
        name: "products/hat",
        src: "products/hat.png",
        frames: 2,
        layers: 1,
        width: 54,
        height: 34,
      },
      {
        name: "products/hat_feather",
        src: "products/hat_feather.png",
        frames: 2,
        layers: 1,
        width: 54,
        height: 36,
      },
      {
        name: "products/meat",
        src: "products/meat.png",
        frames: 2,
        layers: 1,
        width: 52,
        height: 34,
      },
      {
        name: "products/meatpacket",
        src: "products/meatpacket.png",
        frames: 2,
        layers: 1,
        width: 52,
        height: 36,
      },
      {
        name: "products/meatspice",
        src: "products/meatspice.png",
        frames: 2,
        layers: 1,
        width: 48,
        height: 38,
      },
      {
        name: "products/milk",
        src: "products/milk.png",
        frames: 2,
        layers: 1,
        width: 42,
        height: 52,
      },
      {
        name: "products/packet",
        src: "products/packet.png",
        frames: 2,
        layers: 1,
        width: 52,
        height: 36,
      },
      {
        name: "products/powder",
        src: "products/powder.png",
        frames: 2,
        layers: 1,
        width: 48,
        height: 48,
      },
      {
        name: "products/sourcream",
        src: "products/sourcream.png",
        frames: 2,
        layers: 1,
        width: 40,
        height: 48,
      },
      {
        name: "products/steak",
        src: "products/steak.png",
        frames: 2,
        layers: 1,
        width: 52,
        height: 34,
      },
      {
        name: "products/textile",
        src: "products/textile.png",
        frames: 2,
        layers: 1,
        width: 50,
        height: 36,
      },
      {
        name: "products_box/box_bear1",
        src: "products_box/box_bear1.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_bear2",
        src: "products_box/box_bear2.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_bear3",
        src: "products_box/box_bear3.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_bear4",
        src: "products_box/box_bear4.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_butter",
        src: "products_box/box_butter.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_cake",
        src: "products_box/box_cake.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_cheese",
        src: "products_box/box_cheese.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_cheese_ferment",
        src: "products_box/box_cheese_ferment.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_chicken",
        src: "products_box/box_chicken.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_cow",
        src: "products_box/box_cow.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_dress",
        src: "products_box/box_dress.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_dried_egg",
        src: "products_box/box_dried_egg.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_egg",
        src: "products_box/box_egg.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_fan",
        src: "products_box/box_fan.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_feather",
        src: "products_box/box_feather.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_flourycake",
        src: "products_box/box_flourycake.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_hat",
        src: "products_box/box_hat.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_hat_feather",
        src: "products_box/box_hat_feather.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_meat",
        src: "products_box/box_meat.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_meatpacket",
        src: "products_box/box_meatpacket.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_meatspice",
        src: "products_box/box_meatspice.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_milk",
        src: "products_box/box_milk.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_ostrich",
        src: "products_box/box_ostrich.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_packet",
        src: "products_box/box_packet.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_pig",
        src: "products_box/box_pig.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_powder",
        src: "products_box/box_powder.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_sourcream",
        src: "products_box/box_sourcream.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_steak",
        src: "products_box/box_steak.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_box/box_textile",
        src: "products_box/box_textile.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 19,
      },
      {
        name: "products_mini/mini_bear1",
        src: "products_mini/mini_bear1.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_bear2",
        src: "products_mini/mini_bear2.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_bear3",
        src: "products_mini/mini_bear3.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_bear4",
        src: "products_mini/mini_bear4.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_butter",
        src: "products_mini/mini_butter.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_cake",
        src: "products_mini/mini_cake.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_cheese",
        src: "products_mini/mini_cheese.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_cheese_ferment",
        src: "products_mini/mini_cheese_ferment.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_dress",
        src: "products_mini/mini_dress.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_dried_egg",
        src: "products_mini/mini_dried_egg.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_egg",
        src: "products_mini/mini_egg.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_fan",
        src: "products_mini/mini_fan.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_feather",
        src: "products_mini/mini_feather.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_flourycake",
        src: "products_mini/mini_flourycake.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_hat",
        src: "products_mini/mini_hat.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_hat_feather",
        src: "products_mini/mini_hat_feather.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_meat",
        src: "products_mini/mini_meat.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_meatpacket",
        src: "products_mini/mini_meatpacket.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_meatspice",
        src: "products_mini/mini_meatspice.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_milk",
        src: "products_mini/mini_milk.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_packet",
        src: "products_mini/mini_packet.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_powder",
        src: "products_mini/mini_powder.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_sourcream",
        src: "products_mini/mini_sourcream.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_steak",
        src: "products_mini/mini_steak.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "products_mini/mini_textile",
        src: "products_mini/mini_textile.png",
        frames: 1,
        layers: 1,
        width: 6,
        height: 6,
      },
      {
        name: "shadows/shadow_bear",
        src: "shadows/shadow_bear.png",
        frames: 4,
        layers: 1,
        width: 36,
        height: 20,
      },
      {
        name: "shadows/shadow_cat",
        src: "shadows/shadow_cat.png",
        frames: 1,
        layers: 1,
        width: 35,
        height: 19,
      },
      {
        name: "shadows/shadow_chicken",
        src: "shadows/shadow_chicken.png",
        frames: 1,
        layers: 1,
        width: 28,
        height: 17,
      },
      {
        name: "shadows/shadow_cow",
        src: "shadows/shadow_cow.png",
        frames: 1,
        layers: 1,
        width: 45,
        height: 27,
      },
      {
        name: "shadows/shadow_dog",
        src: "shadows/shadow_dog.png",
        frames: 1,
        layers: 1,
        width: 38,
        height: 22,
      },
      {
        name: "shadows/shadow_ostrich",
        src: "shadows/shadow_ostrich.png",
        frames: 1,
        layers: 1,
        width: 25,
        height: 19,
      },
      {
        name: "shadows/shadow_pig",
        src: "shadows/shadow_pig.png",
        frames: 1,
        layers: 1,
        width: 35,
        height: 22,
      },
      {
        name: "transport/car1",
        src: "transport/car1.png",
        frames: 1,
        layers: 1,
        width: 55,
        height: 53,
      },
      {
        name: "transport/car2",
        src: "transport/car2.png",
        frames: 1,
        layers: 1,
        width: 55,
        height: 51,
      },
      {
        name: "transport/car3",
        src: "transport/car3.png",
        frames: 1,
        layers: 1,
        width: 57,
        height: 53,
      },
      {
        name: "transport/car4",
        src: "transport/car4.png",
        frames: 1,
        layers: 1,
        width: 60,
        height: 57,
      },
      {
        name: "transport/plane1",
        src: "transport/plane1.png",
        frames: 1,
        layers: 1,
        width: 65,
        height: 48,
      },
      {
        name: "transport/plane2",
        src: "transport/plane2.png",
        frames: 1,
        layers: 1,
        width: 63,
        height: 43,
      },
      {
        name: "transport/plane3",
        src: "transport/plane3.png",
        frames: 1,
        layers: 1,
        width: 65,
        height: 50,
      },
      {
        name: "transport/plane4",
        src: "transport/plane4.png",
        frames: 1,
        layers: 1,
        width: 65,
        height: 43,
      },
      {
        name: "ui_level/minimap_cost",
        src: "ui_level/minimap_cost.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 10,
      },
      {
        name: "ui_level/mini_car1",
        src: "ui_level/mini_car1.png",
        frames: 1,
        layers: 1,
        width: 19,
        height: 16,
      },
      {
        name: "ui_level/mini_car2",
        src: "ui_level/mini_car2.png",
        frames: 1,
        layers: 1,
        width: 23,
        height: 15,
      },
      {
        name: "ui_level/mini_car3",
        src: "ui_level/mini_car3.png",
        frames: 1,
        layers: 1,
        width: 24,
        height: 15,
      },
      {
        name: "ui_level/mini_car4",
        src: "ui_level/mini_car4.png",
        frames: 1,
        layers: 1,
        width: 24,
        height: 18,
      },
      {
        name: "ui_level/mini_plane1",
        src: "ui_level/mini_plane1.png",
        frames: 1,
        layers: 1,
        width: 22,
        height: 13,
      },
      {
        name: "ui_level/mini_plane2",
        src: "ui_level/mini_plane2.png",
        frames: 1,
        layers: 1,
        width: 24,
        height: 14,
      },
      {
        name: "ui_level/mini_plane3",
        src: "ui_level/mini_plane3.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 15,
      },
      {
        name: "ui_level/mini_plane4",
        src: "ui_level/mini_plane4.png",
        frames: 1,
        layers: 1,
        width: 32,
        height: 14,
      },
      {
        name: "ui_level/road",
        src: "ui_level/road.png",
        frames: 1,
        layers: 1,
        width: 155,
        height: 41,
      },
      {
        name: "ui_level/anim_clock",
        src: "ui_level/anim_clock.png",
        frames: 16,
        layers: 1,
        width: 20,
        height: 20,
      },
      {
        name: "ui_level/anim_stars",
        src: "ui_level/anim_stars.png",
        frames: 16,
        layers: 1,
        width: 24,
        height: 20,
      },
      {
        name: "ui_level/complete_gold_cup",
        src: "ui_level/complete_gold_cup.png",
        frames: 1,
        layers: 1,
        width: 86,
        height: 86,
      },
      {
        name: "ui_level/complete_silver_cup",
        src: "ui_level/complete_silver_cup.png",
        frames: 1,
        layers: 1,
        width: 86,
        height: 86,
      },
      {
        name: "ui_level/goal_done",
        src: "ui_level/goal_done.png",
        frames: 1,
        layers: 1,
        width: 14,
        height: 10,
      },
      {
        name: "ui_level/goal_gold",
        src: "ui_level/goal_gold.png",
        frames: 1,
        layers: 1,
        width: 46,
        height: 26,
      },
      {
        name: "ui_level/goal_menu",
        src: "ui_level/goal_menu.png",
        frames: 3,
        layers: 1,
        width: 84,
        height: 44,
      },
      {
        name: "ui_level/goal_onlevel",
        src: "ui_level/goal_onlevel.png",
        frames: 1,
        layers: 1,
        width: 220,
        height: 238,
      },
      {
        name: "ui_level/goal_silver",
        src: "ui_level/goal_silver.png",
        frames: 1,
        layers: 1,
        width: 46,
        height: 26,
      },
      {
        name: "ui_level/goal_start",
        src: "ui_level/goal_start.png",
        frames: 1,
        layers: 1,
        width: 184,
        height: 220,
      },
      {
        name: "ui_level/level_complete",
        src: "ui_level/level_complete.png",
        frames: 1,
        layers: 1,
        width: 238,
        height: 258,
      },
      {
        name: "ui_level/menu_onlevel1",
        src: "ui_level/menu_onlevel1.png",
        frames: 1,
        layers: 1,
        width: 570,
        height: 30,
      },
      {
        name: "ui_level/menu_onlevel2",
        src: "ui_level/menu_onlevel2.png",
        frames: 1,
        layers: 1,
        width: 480,
        height: 30,
      },
      {
        name: "ui_level/menu_star",
        src: "ui_level/menu_star.png",
        frames: 1,
        layers: 1,
        width: 20,
        height: 18,
      },
      {
        name: "ui_level/play_clock",
        src: "ui_level/play_clock.png",
        frames: 1,
        layers: 1,
        width: 12,
        height: 14,
      },
      {
        name: "ui_level/play_menu",
        src: "ui_level/play_menu.png",
        frames: 1,
        layers: 1,
        width: 570,
        height: 46,
      },
      {
        name: "ui_level/play_menu_2",
        src: "ui_level/play_menu_2.png",
        frames: 1,
        layers: 1,
        width: 480,
        height: 46,
      },
      {
        name: "ui_level/play_strip",
        src: "ui_level/play_strip.png",
        frames: 1,
        layers: 1,
        width: 38,
        height: 16,
      },
      {
        name: "ui_level/play_strip_silver",
        src: "ui_level/play_strip_silver.png",
        frames: 1,
        layers: 1,
        width: 38,
        height: 16,
      },
      {
        name: "ui_level/buy_cat1",
        src: "ui_level/buy_cat1.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_cat2",
        src: "ui_level/buy_cat2.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_cat3",
        src: "ui_level/buy_cat3.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_cat4",
        src: "ui_level/buy_cat4.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_chicken",
        src: "ui_level/buy_chicken.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_cow",
        src: "ui_level/buy_cow.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_dog1",
        src: "ui_level/buy_dog1.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_dog2",
        src: "ui_level/buy_dog2.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_dog3",
        src: "ui_level/buy_dog3.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_dog4",
        src: "ui_level/buy_dog4.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_ostrich",
        src: "ui_level/buy_ostrich.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/buy_pig",
        src: "ui_level/buy_pig.png",
        frames: 4,
        layers: 1,
        width: 30,
        height: 32,
      },
      {
        name: "ui_level/gold_coin",
        src: "ui_level/gold_coin.png",
        frames: 16,
        layers: 1,
        width: 16,
        height: 16,
      },
      {
        name: "ui_level/icon_upgrade1",
        src: "ui_level/icon_upgrade1.png",
        frames: 4,
        layers: 1,
        width: 42,
        height: 16,
      },
      {
        name: "ui_level/icon_upgrade2",
        src: "ui_level/icon_upgrade2.png",
        frames: 4,
        layers: 1,
        width: 36,
        height: 16,
      },
      {
        name: "ui_level/onlevel_buy_ui",
        src: "ui_level/onlevel_buy_ui.png",
        frames: 1,
        layers: 1,
        width: 179,
        height: 33,
      },
      {
        name: "shop/shop_avia",
        src: "shop/shop_avia.png",
        frames: 3,
        layers: 1,
        width: 48,
        height: 32,
      },
      {
        name: "shop/shop_back1",
        src: "shop/shop_back1.jpg",
        frames: 1,
        layers: 1,
        width: 480,
        height: 320,
      },
      {
        name: "shop/shop_butter_house",
        src: "shop/shop_butter_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_cage",
        src: "shop/shop_cage.png",
        frames: 3,
        layers: 1,
        width: 38,
        height: 34,
      },
      {
        name: "shop/shop_cake_house",
        src: "shop/shop_cake_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 36,
      },
      {
        name: "shop/shop_car",
        src: "shop/shop_car.png",
        frames: 3,
        layers: 1,
        width: 40,
        height: 30,
      },
      {
        name: "shop/shop_carnival_dress_house",
        src: "shop/shop_carnival_dress_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_cat",
        src: "shop/shop_cat.png",
        frames: 3,
        layers: 1,
        width: 42,
        height: 28,
      },
      {
        name: "shop/shop_cheese_house",
        src: "shop/shop_cheese_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_depot",
        src: "shop/shop_depot.png",
        frames: 3,
        layers: 1,
        width: 44,
        height: 30,
      },
      {
        name: "shop/shop_dog",
        src: "shop/shop_dog.png",
        frames: 3,
        layers: 1,
        width: 44,
        height: 30,
      },
      {
        name: "shop/shop_dried_eggs_house",
        src: "shop/shop_dried_eggs_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_fan_house",
        src: "shop/shop_fan_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_floury_cake_house",
        src: "shop/shop_floury_cake_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 36,
      },
      {
        name: "shop/shop_layer",
        src: "shop/shop_layer.png",
        frames: 2,
        layers: 1,
        width: 68,
        height: 42,
      },
      {
        name: "shop/shop_meat_house",
        src: "shop/shop_meat_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_meat_packet_house",
        src: "shop/shop_meat_packet_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_meat_spice_house",
        src: "shop/shop_meat_spice_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_numbers",
        src: "shop/shop_numbers.png",
        frames: 11,
        layers: 1,
        width: 12,
        height: 16,
      },
      {
        name: "shop/shop_ok",
        src: "shop/shop_ok.png",
        frames: 1,
        layers: 1,
        width: 13,
        height: 10,
      },
      {
        name: "shop/shop_plumed_hat_house",
        src: "shop/shop_plumed_hat_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_sour_cream_house",
        src: "shop/shop_sour_cream_house.png",
        frames: 5,
        layers: 1,
        width: 48,
        height: 34,
      },
      {
        name: "shop/shop_star",
        src: "shop/shop_star.png",
        frames: 15,
        layers: 1,
        width: 20,
        height: 20,
      },
      {
        name: "shop/shop_well",
        src: "shop/shop_well.png",
        frames: 3,
        layers: 1,
        width: 44,
        height: 32,
      },
      {
        name: "ui_level/but_panel",
        src: "ui_level/but_panel.png",
        frames: 3,
        layers: 1,
        width: 144,
        height: 62,
      },
      {
        name: "ui_level/level_bottom",
        src: "ui_level/level_bottom.png",
        frames: 1,
        layers: 1,
        width: 480,
        height: 64,
      },
      {
        name: "ui_level/pause_panel",
        src: "ui_level/pause_panel.png",
        frames: 1,
        layers: 1,
        width: 138,
        height: 180,
      },
      {
        name: "ui_level/yes_no_panel",
        src: "ui_level/yes_no_panel.png",
        frames: 1,
        layers: 1,
        width: 202,
        height: 117,
      },
    ],
  ],
  I18 = {
    currentLocale: "en",
    supportedLanguage: ["en", "ru", "pt", "it", "es", "fr", "de"],
    strings: {},
    init: function (e, t) {
      var s = window.navigator.userLanguage || window.navigator.language || "";
      e || (e = ExternalAPI.exec("getLanguage") || s.substr(0, 2)),
        "thumbstar" == ExternalAPI.type &&
          (I18.supportedLanguage = ["en", "pt", "it", "es", "ru", "fr"]),
        I18.supportedLanguage.indexOf(e) < 0 && (e = I18.supportedLanguage[0]),
        (I18.currentLocale = e),
        Utils.get("data/lang/" + e + ".json", null, "json", function (e) {
          I18.setup(e), t && t();
        });
    },
    setup: function (e) {
      I18.strings = e;
    },
    trim: function (e) {
      return e ? e.replace(/^\s+|\s+$/gm, "") : "";
    },
    arrayAntidot: function (e) {
      return e ? (e.length > 0 && Utils.isArray(e[0]) ? e[0] : e) : void 0;
    },
    getString: function (e, t) {
      "undefined" == typeof t && (t = null);
      var s = I18.getStringOrNull(e, t);
      return null == s ? "{" + e + "}" : s;
    },
    getStringOrNull: function (e, t) {
      "undefined" == typeof t && (t = null);
      var s = I18.strings[e];
      return (
        "undefined" == typeof s && (s = null),
        null == t || null == s
          ? s
          : ((t = [s].concat(I18.arrayAntidot(t))), I18.sprintf.apply(I18, t))
      );
    },
    f: function (e) {
      var t = I18.arrayAntidot(Array.prototype.slice.call(arguments, 1));
      return Utils.isArray(t) || (t = [t]), I18.getString(e, t);
    },
    s: function (e, t, s) {
      return (
        Utils.isArray(s) || (s = [s]),
        I18.getString(e + "_" + t, I18.arrayAntidot(s))
      );
    },
    sf: function (e, t, s) {
      return I18.getString(e + "_" + t, I18.arrayAntidot(s));
    },
    psf: function (e, t, s, i, a) {
      return I18.getString(e + "_" + t + "_" + s, I18.arrayAntidot(i));
    },
    sprintf: function () {
      var e =
          /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
        t = arguments,
        s = 0,
        i = t[s++],
        a = function (e, t, s, i) {
          s || (s = " ");
          var a =
            e.length >= t ? "" : new Array((1 + t - e.length) >>> 0).join(s);
          return i ? e + a : a + e;
        },
        r = function (e, t, s, i, r, o) {
          var n = i - e.length;
          return (
            n > 0 &&
              (e =
                s || !r
                  ? a(e, i, o, s)
                  : e.slice(0, t.length) +
                    a("", n, "0", !0) +
                    e.slice(t.length)),
            e
          );
        },
        o = function (e, t, s, i, o, n, h) {
          var l = e >>> 0;
          return (
            (s = (s && l && { 2: "0b", 8: "0", 16: "0x" }[t]) || ""),
            (e = s + a(l.toString(t), n || 0, "0", !1)),
            r(e, s, i, o, h)
          );
        },
        n = function (e, t, s, i, a, o) {
          return null != i && (e = e.slice(0, i)), r(e, "", t, s, a, o);
        },
        h = function (e, i, h, l, p, d, c) {
          var u, g, f, m, y;
          if ("%%" === e) return "%";
          for (
            var x = !1, v = "", w = !1, b = !1, S = " ", A = h.length, _ = 0;
            h && A > _;
            _++
          )
            switch (h.charAt(_)) {
              case " ":
                v = " ";
                break;
              case "+":
                v = "+";
                break;
              case "-":
                x = !0;
                break;
              case "'":
                S = h.charAt(_ + 1);
                break;
              case "0":
                (w = !0), (S = "0");
                break;
              case "#":
                b = !0;
            }
          if (
            ((l = l
              ? "*" === l
                ? +t[s++]
                : "*" == l.charAt(0)
                ? +t[l.slice(1, -1)]
                : +l
              : 0),
            0 > l && ((l = -l), (x = !0)),
            !isFinite(l))
          )
            throw new Error("sprintf: (minimum-)width must be finite");
          switch (
            ((d = d
              ? "*" === d
                ? +t[s++]
                : "*" == d.charAt(0)
                ? +t[d.slice(1, -1)]
                : +d
              : "fFeE".indexOf(c) > -1
              ? 6
              : "d" === c
              ? 0
              : void 0),
            (y = i ? t[i.slice(0, -1)] : t[s++]),
            c)
          ) {
            case "s":
              return n(String(y), x, l, d, w, S);
            case "c":
              return n(String.fromCharCode(+y), x, l, d, w);
            case "b":
              return o(y, 2, b, x, l, d, w);
            case "o":
              return o(y, 8, b, x, l, d, w);
            case "x":
              return o(y, 16, b, x, l, d, w);
            case "X":
              return o(y, 16, b, x, l, d, w).toUpperCase();
            case "u":
              return o(y, 10, b, x, l, d, w);
            case "i":
            case "d":
              return (
                (u = +y || 0),
                (u = Math.round(u - (u % 1))),
                (g = 0 > u ? "-" : v),
                (y = g + a(String(Math.abs(u)), d, "0", !1)),
                r(y, g, x, l, w)
              );
            case "e":
            case "E":
            case "f":
            case "F":
            case "g":
            case "G":
              return (
                (u = +y),
                (g = 0 > u ? "-" : v),
                (f = ["toExponential", "toFixed", "toPrecision"][
                  "efg".indexOf(c.toLowerCase())
                ]),
                (m = ["toString", "toUpperCase"]["eEfFgG".indexOf(c) % 2]),
                (y = g + Math.abs(u)[f](d)),
                r(y, g, x, l, w)[m]()
              );
            default:
              return e;
          }
        };
      return i.replace(e, h);
    },
  },
  GAME_ID = "farm_frenzy2",
  stage = null,
  fps = 60,
  GET = {},
  config = {},
  depot = {},
  landCheck,
  places = [],
  curLevel,
  money = 0,
  accesses = [],
  gagTimeout = 6e5,
  gagTimer = gagTimeout,
  hint = {},
  hintAward = {},
  goals,
  LANDSCAPE_MODE = !0,
  SPLIT_LOADING = !0,
  STATE_LOAD = 0,
  STATE_LOGO = 1,
  STATE_MENU = 2,
  STATE_GAME = 3,
  STATE_SHOP = 4,
  STATE_MAP = 5,
  STATE_AWARDS = 6,
  gameState = STATE_LOAD,
  gameData = {},
  soundOn = !0,
  musicOn = !0,
  playingMusic,
  mixer,
  isWebAudio = AudioMixer.isWebAudioSupport();
window.onload = function () {
  (GET = Utils.parseGet()),
    (Sprite.CACHE_BITMAPS = Utils.isIOS()),
    Utils.addMobileListeners(LANDSCAPE_MODE, !0),
    Utils.mobileCorrectPixelRatio(),
    Utils.addFitLayoutListeners(),
    I18.init(),
    Utils.switchToTimeMode(1e3 / 24),
    (ExternalAPI.onrefresh = refreshData),
    (ExternalAPI.onuserdelayauth = saveExternal),
    ExternalAPI.init(
      {
        serverGameId: 9,
        serverUrl: "//gameserver.playtomax.com/farm_frenzy2/",
      },
      startLoad
    ) !== !0 && setTimeout(startLoad, 600);
};
var lockMC = null,
  backgroundImage = null;
classConfig.prototype.parseXML = function (e, t) {
  if (e) {
    for (var s = 0; s < e.attributes.length; s++) {
      var i = e.attributes.item(s);
      if (t) this[i.name] = i.value;
      else {
        var a = i.value.search(" ");
        if (-1 == a)
          "0" == i.value || parseFloat(i.value) > 0
            ? (this[i.name] = parseFloat(i.value))
            : (this[i.name] = i.value);
        else {
          for (var r = i.value.split(" "), o = 0; o < r.length; o++)
            r[o] = parseFloat(r[o]);
          this[i.name] = r;
        }
      }
    }
    for (var n = e.childNodes, s = 0; s < n.length; s++) {
      if (n[s].nodeValue && n[s].nodeValue.length > 0 && !t) {
        var a = n[s].nodeValue.search(" ");
        if (-1 != a) {
          for (var r = n[s].nodeValue.split(" "), o = 0; o < r.length; o++)
            r[o] = parseFloat(r[o]);
          this[n[s].parentNode.nodeName] = r;
        }
      }
      if (n[s].attributes) {
        var h = n[s].nodeName;
        this[h]
          ? this[h] instanceof Array
            ? this[h].push(new classConfig(n[s], t))
            : ((this[h] = [this[h]]), this[h].push(new classConfig(n[s], t)))
          : (this[h] = new classConfig(n[s], t));
      }
    }
  }
};
