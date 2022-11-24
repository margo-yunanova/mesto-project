export default class UserInfo {
  constructor({ name, bio, avatar }) {
    this.name = document.querySelector(name);
    this.bio = document.querySelector(bio);
    this.avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      bio: this.bio.textContent
    };
  }

  setUserInfo(username, userbio) {
    this.name.textContent = username;
    this.bio.textContent = userbio;
  }

  setUserAvatar(avatar) {
    this.avatar.src = avatar;
  }
}
