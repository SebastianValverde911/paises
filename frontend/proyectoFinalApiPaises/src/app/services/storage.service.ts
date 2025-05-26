import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _userInfo: any[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.get(key);
  }


  
}
