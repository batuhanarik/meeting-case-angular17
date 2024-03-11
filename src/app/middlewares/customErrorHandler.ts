import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CustomMessageService } from "../services/custom-message.service";
import { MessageService } from "primeng/api";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private _message: CustomMessageService, private _messageService: MessageService) { }

    handleError(error: any): void {
        if (error instanceof HttpErrorResponse) {
            if (error.error.Message) {
                alert(error.error.Message)
                this._messageService.add({ severity: 'error', summary: error.error.Message });
                this._message.error();
            } else {
                alert(JSON.parse(error.error)['Message'])
                console.log(error)
            }

        } else {
            alert("Authorization Denied :(")
        }
    }
}