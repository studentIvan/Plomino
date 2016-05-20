import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ElementService } from '../../services/element.service';

@Component({
    selector: 'my-actions-settings',
    template: require('./actions-settings.component.html'),
    styles: ['form {margin: 15px;} .help-block {font-style: italic;}'],
    providers: [ElementService]
})
export class ActionsSettingsComponent {
    @Input() id: string;
    data: any;
    @Output() titleChanged = new EventEmitter();

    constructor(private _elementService: ElementService) { }

    ngOnInit() {
        this.getElement();
    }

    getElement() {
        this._elementService.getElement(this.id)
            .subscribe(
                data => { this.data = data },
                err => console.error(err)
            );
    }

    onSubmit(id: string, title: string, description: string, actionType:string, actionDisplay:string, inActionBar: boolean) {
        let element = {
            "title": title,
            "description": description,
            "action_type": actionType,
            "action_display": actionDisplay,
            "in_action_bar": inActionBar
        };
        this._elementService.patchElement(id, JSON.stringify(element));
        this.titleChanged.emit(this.data.title);
    }
}