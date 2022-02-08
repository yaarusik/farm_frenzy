import Control from "../builder/controller";
import StartPage from "./pages/startPage";
import GameMapPage from "./pages/gameMapPage";
import ShopPage from "./pages/shopPage";
import LevelPage from "./pages/levelPage";
import SettingsPage from "./pages/settingsPage";
import AwardsPage from "./pages/awardsPage";
import AuthorsPage from "./pages/authorsPage";
import { Music } from "../utils/music/music";

export default class Application extends Control {
	music: Music;
	constructor (parentNode: HTMLElement) {
		super(parentNode);
		// preloader

		// this.mainCycle();
		// this.gameMapCycle();
		this.levelCycle(1);
		
		this.music = new Music();
		this.music.start();
	}
	// главная страница
	private mainCycle() {
		const startPage = new StartPage(this.node);
		startPage.onSelectMap = () => {
			startPage.destroy();
			// preloader
			this.gameMapCycle();
		};
		startPage.onSettings = () => {
			startPage.destroy();
			this.settingsCycle();
		};
		startPage.onAwards = () => {
			startPage.destroy();
			this.awardsCycle();
		};
		startPage.onAuthors = () => {
			startPage.destroy();
			this.authorsCycle();
		};
	}


	// страница карты
	private gameMapCycle() {
		const pageWrapper = new Control<HTMLDivElement>(this.node, "div", "wrapper__map", "");
		const gameMapPage = new GameMapPage(pageWrapper.node, "div", "map", "");
		gameMapPage.onSelectShop = () => {
			gameMapPage.destroy();
			this.shopCycle();
		};
		gameMapPage.startLevel = (level: number) => {
			gameMapPage.destroy();
			this.levelCycle(level);
		};
		gameMapPage.onBack = () => {
			gameMapPage.destroy();
			this.mainCycle();
		};
	}

	// страница магазина
	private shopCycle() {
		const shopPage = new ShopPage(this.node);
		shopPage.gameMapBack = () => {
			shopPage.destroy();
			this.gameMapCycle();
		};
	}

	private levelCycle(level: number) {
		const pageWrapper = new Control<HTMLDivElement>(this.node, "div", "wrapper__map", "");
		const levelPage = new LevelPage(pageWrapper.node, level);

		levelPage.onMap = () => {
			levelPage.destroy();
			this.gameMapCycle();
		};
		levelPage.onMain = () => {
			levelPage.destroy();
			this.mainCycle();
		};
		levelPage.onRestart = () => {
			levelPage.destroy();
			// запомнить может баги давать
			this.levelCycle(level);
		};
		levelPage.onSettings = () => {
			levelPage.destroy();
			this.settingsCycle();
		};
	}

	private settingsCycle() {
		const settingsPage = new SettingsPage(this.node);
		settingsPage.onBack = () => {
			settingsPage.destroy();
			this.mainCycle();
		};
	}
	private awardsCycle() {
		const awardsPage = new AwardsPage(this.node);
		awardsPage.onBack = () => {
			awardsPage.destroy();
			this.mainCycle();
		};
	}

	private authorsCycle() {
		const authorsPage = new AuthorsPage(this.node);
		authorsPage.onBack = () => {
			authorsPage.destroy();
			this.mainCycle();
		};
	}
}