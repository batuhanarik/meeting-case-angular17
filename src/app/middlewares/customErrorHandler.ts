import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CustomMessageService } from "../services/custom-message.service";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private _message: CustomMessageService, private injector: Injector) { }

    handleError(error: any): void {
        // const messageService = this.injector.get(MessageService);
        if (error instanceof HttpErrorResponse) {
            this._message.error();
        } else {
            // Handle other errors
            this._message.error();
        }
    }
}