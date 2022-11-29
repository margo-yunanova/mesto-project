export default class UserInfo {
  constructor({ name, about, avatar }) {
    this.name = document.querySelector(name);
    this.about = document.querySelector(about);
    this.avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.about.textContent
    };
  }

  setUserInfo(name, about) {
    this.name.textContent = name;
    this.about.textContent = about;
  }

  setUserAvatar(avatar) {
    this.avatar.src = avatar;
  }
}
