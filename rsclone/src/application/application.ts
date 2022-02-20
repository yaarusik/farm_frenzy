import Control from "../builder/controller";
import StartPage from "./pages/startPage";
import GameMapPage from "./pages/gameMapPage";
import ShopPage from "./pages/shopPage";
import LevelPage from "./pages/levelPage";
import SettingsPage from "./pages/settingsPage";
import AwardsPage from "./pages/awardsPage";
import AuthorsPage from "./pages/authorsPage";
import { Music } from "../utils/music/music";
import Preloader from "./preloader";

export default class Application extends Control {
	music: Music;
	constructor (parentNode: HTMLElement, tagName: string, className: string) {
		super(parentNode, tagName, className);

		const preloader = new Preloader(this.node, 'div', 'preloader');
		window.onload = () => {
			preloader.hide(preloader.node);
		};

		this.mainCycle();
		// this.gameMapCycle();
		// this.levelCycle(4);

		this.music = new Music();
		this.music.start();
	}
	// главная страница
	private mainCycle() {
		const startPage = new StartPage(this.node, 'div', 'main__page');
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
		const preloader = new Preloader(this.node, 'div', 'preloader');
		const pageWrapper = new Control<HTMLDivElement>(this.node, "div", "wrapper__map", "");
		const gameMapPage = new GameMapPage(pageWrapper.node, "div", "map", "", preloader);
		gameMapPage.onSelectShop = () => {
			pageWrapper.destroy();
			gameMapPage.destroy();
			this.shopCycle();
		};
		gameMapPage.startLevel = (level: number) => {
			pageWrapper.destroy();
			gameMapPage.destroy();
			this.levelCycle(level);
		};
		gameMapPage.onBack = () => {
			pageWrapper.destroy();
			gameMapPage.destroy();
			this.mainCycle();
		};
	}

	// страница магазина
	private shopCycle() {
		const preloader = new Preloader(this.node, 'div', 'preloader');
		const shopPage = new ShopPage(this.node, preloader);
		shopPage.gameMapBack = () => {
			shopPage.destroy();
			this.gameMapCycle();
		};
	}

	private levelCycle(level: number) {
		const preloader = new Preloader(this.node, 'div', 'preloader');
		const pageWrapper = new Control<HTMLDivElement>(this.node, "div", "wrapper__map level", "");
		const levelPage = new LevelPage(pageWrapper.node, "div", 'level__page', level, preloader);

		levelPage.onMap = () => {
			pageWrapper.destroy();
			levelPage.destroy();
			this.gameMapCycle();
		};
		levelPage.onMain = () => {
			pageWrapper.destroy();
			levelPage.destroy();
			this.mainCycle();
		};
		levelPage.onRestart = () => {
			pageWrapper.destroy();
			levelPage.destroy();
			this.levelCycle(level);
		};
		levelPage.onSettings = () => {
			pageWrapper.destroy();
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