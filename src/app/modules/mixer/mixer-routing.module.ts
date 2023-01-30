import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterFinderComponent } from './character-finder/character-finder.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { PhraseMakerComponent } from './phrase-maker/phrase-maker.component';
import { TextMixerComponent } from './text-mixer/text-mixer.component';
import { WordMatcherComponent } from './word-matcher/word-matcher.component';

const routes: Routes = [
  {
    path: '',
  //   component: ListActiveCustomersComponent,
    children: [
      {
        path: 'text-mixer',
       component: TextMixerComponent,
      },
      {
        path: 'word-matcher',
       component: WordMatcherComponent,
      },
      {
        path: 'dictionary',
       component: DictionaryComponent,
      },
      {
        path: 'character-finder',
       component: CharacterFinderComponent,
      },
      {
        path: 'phrase-maker',
       component: PhraseMakerComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MixerRoutingModule {}
