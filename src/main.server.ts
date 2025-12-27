import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';

export default async function bootstrap(context: BootstrapContext) {
  return await bootstrapApplication(AppComponent, config, context);
}
