import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _userInfo: any[] = [];
  private _localSitios: any[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
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

  async loadFavorites() {
    try {
      
      const sitios = await this._storage?.get('sitiosFavoritos');
      this._localSitios = sitios || [];

    } catch (error) {
      
    }

  }

  public sitiosInFavorites( sitio: any ) {
    return !!this._localSitios.find( localSitio => localSitio.id === sitio.id );
  }

  async saveRemoveSitio( sitio: any ) {
    const exists = this._localSitios.find( localSitio => localSitio.id === sitio.id );

    if ( exists ) {
      this._localSitios = this._localSitios.filter( localSitio => localSitio.id !== sitio.id );
    } else {
      this._localSitios = [ sitio, ...this._localSitios];
    }

    this._storage?.set('sitiosFavoritos', this._localSitios );

  }
}
