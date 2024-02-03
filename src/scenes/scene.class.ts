import { Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export abstract class Scene {
  protected constructor(protected scene: Scenes.BaseScene<IBotContext>) {}

  abstract handle(): void;
  public getSceneInstance() {
    return this.scene;
  }
}
