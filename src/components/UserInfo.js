export class UserInfo {
  constructor({ name, job, avatar}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }

  setUserInfo (name, info) {
    if (name && info) {
    this._name.textContent = data.name;
    this._job.textContent = data.info;
    }
  }

  setUserAvatar(link) {
    if (link) {
      this._avatar.src = link;
    }
  }
}