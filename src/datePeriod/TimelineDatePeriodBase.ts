/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import { ITimelineJSONDatePeriod } from "../dataInterfaces";
import { Utils } from "../utils";
import { ITimelineDatePeriodBase } from "./datePeriod";

export class TimelineDatePeriodBase implements ITimelineDatePeriodBase {
    public static PARSE(jsonString: string): TimelineDatePeriodBase {
        let datePeriod: ITimelineJSONDatePeriod;
        let startDate: Date = null;
        let endDate: Date = null;

        try {
            datePeriod = JSON.parse(jsonString);
        } catch (_) {
            datePeriod = null;
        }

        if (datePeriod) {
            startDate = Utils.PARSEDATEWITHOUTTIMEZONE(datePeriod.startDate);
            endDate = Utils.PARSEDATEWITHOUTTIMEZONE(datePeriod.endDate);
        }

        return TimelineDatePeriodBase.CREATE(startDate, endDate);
    }

    public static CREATE(startDate: Date, endDate: Date): TimelineDatePeriodBase {
        return new TimelineDatePeriodBase(startDate, endDate);
    }

    public static CREATEEMPTY(): TimelineDatePeriodBase {
        return TimelineDatePeriodBase.CREATE(null, null);
    }

    public startDate: Date = null;
    public endDate: Date = null;

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public toString(): string {
        const jsonDatePeriod: ITimelineJSONDatePeriod = {
            endDate: Utils.TOSTRINGDATEWITHOUTTIMEZONE(this.endDate),
            startDate: Utils.TOSTRINGDATEWITHOUTTIMEZONE(this.startDate),
        };

        return JSON.stringify(jsonDatePeriod);
    }
}
