import View from '../../services/view/view';
import { avatarModalTmpl } from './avatar-modal.tmpl';
import { IChildrenChangeAvatarModal, IPropsChangeAvatarModal } from './avatar-modal.types';
import { Button } from '../button';

export class AvatarModal extends View<IPropsChangeAvatarModal, IChildrenChangeAvatarModal> {
  constructor(props: IPropsChangeAvatarModal) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.initChildren();
    this.initEvents();
  }

  render(): DocumentFragment {
    return this.compile(avatarModalTmpl);
  }

  initChildren(): void {
    this.children.confirmBtn = new Button({
      name: 'Change',
      id: this.props.confirmBtnId,
      size: 's',
    });

    this.children.cancelBtn = new Button({
      name: 'Cancel',
      id: 'avatar-modal-cancel',
      size: 's',
    });
  }

  initEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'avatar-modal-cancel') {
            this.close();
          }
        },
      },
    });
  }

  open() {
    this.show();
  }

  close() {
    this.hide();
    (document.getElementById(this.props.inputId) as HTMLInputElement).value = '';
  }
}
