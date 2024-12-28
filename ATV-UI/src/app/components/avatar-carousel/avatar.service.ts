import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private selectedAvatarSource = new BehaviorSubject<number>(0);
  private hasSelectedAvatarSource = new BehaviorSubject<boolean>(false);
  
  selectedAvatar$ = this.selectedAvatarSource.asObservable();
  hasSelectedAvatar$ = this.hasSelectedAvatarSource.asObservable();

  setSelectedAvatar(index: number) {
    this.selectedAvatarSource.next(index);
    this.hasSelectedAvatarSource.next(true);
  }

  clearSelection() {
    this.hasSelectedAvatarSource.next(false);
  }
}