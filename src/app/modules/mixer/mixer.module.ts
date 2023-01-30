import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { MixerRoutingModule } from './mixer-routing.module';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMixerComponent } from './text-mixer/text-mixer.component';
import { ProgressComponent } from './progress/progress.component';
import { WordMatcherComponent } from './word-matcher/word-matcher.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { CharacterFinderComponent } from './character-finder/character-finder.component';
import { PhraseMakerComponent } from './phrase-maker/phrase-maker.component';

@NgModule({
  declarations: [TextMixerComponent, ProgressComponent, WordMatcherComponent, DictionaryComponent, CharacterFinderComponent, PhraseMakerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MixerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SortablejsModule
  ], 
  entryComponents: [
    
  ]
})
export class MixerModule {}
