import Control from "../builder/controller";
import StartPage from "./pages/startPage";
import GameMapPage from "./pages/gameMapPage";
import ShopPage from "./pages/shopPage";
import LevelPage from "./pages/levelPage";
import SettingsPage from "./pages/settingsPage";
import AuthorsPage from "./pages/authorsPage";
import { Music } from "../utils/music/music";
import LoginPage from "./pages/loginPage";
import Preloader from "./preloader";
import RegPage from "./pages/regPage";

export default class Application extends Control {
	music: Music;
	constructor (parentNode: HTMLElement, tagName: string, className: string) {
		super(parentNode, tagName, className);

		const preloader = new Preloader(this.node, 'div', 'preloader');
		window.onload = () => {
			preloader.hide(preloader.node);
		};

		this.mainCycle();


		this.music = new Music();
		this.music.start();
	}

	private mainCycle() {
		const startPage = new StartPage(this.node, 'div', 'main__page');
		startPage.onSelectMap = () => {
			startPage.destroy();
			this.music.btnClick();
			this.gameMapCycle();
		};
		startPage.onSettings = () => {
			this.music.btnClick();
			startPage.destroy();
			this.settingsCycle();
		};
		startPage.onAuthors = () => {
			this.music.btnClick();
			startPage.destroy();
			this.authorsCycle();
		};
		startPage.onLogin = () => {
			startPage.destroy();
			this.loginCycle();
		};
	}


	private gameMapCycle() {
		const preloader = new Preloader(this.node, 'div', 'preloader');
		const pageWrapper = new Control<HTMLDivElement>(this.node, "div", "wrapper__map", "");
		const gameMapPage = new GameMapPage(pageWrapper.node, "div", "map", "", preloader);
		gameMapPage.onSelectShop = () => {
			this.music.btnClick();
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
			this.music.btnClick();
			pageWrapper.destroy();
			gameMapPage.destroy();
			this.mainCycle();
		};
	}

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
			this.music.btnClick();
			settingsPage.destroy();
			this.mainCycle();
		};
	}

	private authorsCycle() {
		const preloader = new Preloader(this.node, 'div', 'preloader');
		const authorsPage = new AuthorsPage(this.node, preloader);
		authorsPage.onBack = () => {
			this.music.btnClick();
			authorsPage.destroy();
			this.mainCycle();
		};
	}

	private loginCycle() {
		const loginPage = new LoginPage(this.node);
		loginPage.onBack = () => {
			loginPage.destroy();
			this.mainCycle();
		};

		loginPage.onReg = () => {
			loginPage.destroy();
			this.regCycle();
		};
	}

	private regCycle() {
		const regCycle = new RegPage(this.node);
		regCycle.onBack = () => {
			regCycle.destroy();
			this.mainCycle();
		};

		regCycle.onLogin = () => {
			regCycle.destroy();
			this.loginCycle();
		};
	}
}