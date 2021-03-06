import { State } from '../schema/state';

void saveTitle();
void savePosition();

export function loadTitle(): State.Title {
  return window.history.state?.title
      || document.title;
}

export function saveTitle(): void {
  void window.history.replaceState(
    {
      ...window.history.state,
      title: document.title,
    },
    document.title);
}

export function loadPosition(): State.Position {
  return window.history.state?.position
      || {
           top: window.pageYOffset,
           left: window.pageXOffset,
         };
}

export function savePosition(): void {
  void window.history.replaceState(
    {
      ...window.history.state,
      position: {
        ...window.history.state?.position,
        top: window.pageYOffset,
        left: window.pageXOffset,
      },
    },
    document.title);
}

export function isTransitable(state: State | null): boolean {
  return state?.pjax?.transition
      || false;
}

export function savePjax(): void {
  void window.history.replaceState(
    {
      ...window.history.state,
      pjax: {
        ...window.history.state?.pjax,
        transition: true,
      },
    },
    document.title);
}
