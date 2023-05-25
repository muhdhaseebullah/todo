const DB = require('../configs/db-connect');
const DateUtils = require('../utils/date-utils');

class TargetUtils {
    static async getAchievedSalesWeightage(merchandiserID, frequency) {
        let now = new Date();
        let visitDate;
        let tempDate = new Date();
        switch (frequency) {
            case 'Daily':
                visitDate = DateUtils.getFormatedDate(now);
                break;
            case 'Monthly':
                tempDate = tempDate.setDate(tempDate.getDate() - (now.getDate() - 1));
                visitDate = DateUtils.getFormatedDate(tempDate);
                break;
            case 'Yearly':
                tempDate = tempDate.setFullYear(now.getFullYear(), 0, 1);
                visitDate = DateUtils.getFormatedDate(tempDate);
                break;
        }
        let connection = await DB.getInstance();
        let sql = "select NVL(SUM(DATA.SKU_CONFIG_QUANTITY * DATA.CONFIG_SINGLE_UNITS * S2.WEIGHT), 0) AS ACHIVED_WEIGHTAGE " +
            "from RECORDED_ORDER_BOOKING_DATA DATA " +
            "         INNER JOIN SKU S2 on DATA.SKU_ID = S2.ID " +
            "         INNER JOIN MERCHANDIZER_VISIT MV on DATA.VISIT_CODE = MV.VISIT_CODE " +
            "         INNER JOIN GENERATED_VISITS GV on MV.GEN_VISIT_ID = GV.ID " +
            "WHERE MECHANDISER_ID = :MECHANDISER_ID " +
            "  AND GV.VISIT_DATE >= TO_DATE(:VISIT_DATE, 'MM/DD/YYYY')";
        let binds = {
            MECHANDISER_ID: merchandiserID,
            VISIT_DATE: visitDate
        };

        let result = await connection.execute(sql, binds, DB.defaultOption);
        return result.rows[0].ACHIVED_WEIGHTAGE;

    }

    static async getPlannedVisits(merchandiserID, frequency) {
        let now = new Date();
        let visitDate;
        let tempDate = new Date();
        switch (frequency) {
            case 'Daily':
                visitDate = DateUtils.getFormatedDate(now);
                break;
            case 'Monthly':
                tempDate = tempDate.setDate(tempDate.getDate() - (now.getDate() - 1));
                visitDate = DateUtils.getFormatedDate(tempDate);
                break;
            case 'Yearly':
                tempDate = tempDate.setFullYear(now.getFullYear(), 0, 1);
                visitDate = DateUtils.getFormatedDate(tempDate);
                break;
        }
        let connection = await DB.getInstance();
        let sql = "select COUNT(ID) AS TOTAL_PLANED " +
            "from GENERATED_VISITS " +
            "WHERE MERCHANDISER_ID = :MECHANDISER_ID " +
            "  AND VISIT_DATE >= TO_DATE(:VISIT_DATE, 'MM/DD/YYYY')";
        let binds = {
            MECHANDISER_ID: merchandiserID,
            VISIT_DATE: visitDate
        };

        let result = await connection.execute(sql, binds, DB.defaultOption);
        return result.rows[0].TOTAL_PLANED;
    }

    static async getPerformedVisits(merchandiserID, frequency) {
        let now = new Date();
        let visitDate;
        switch (frequency) {
            case 'Daily':
                visitDate = DateUtils.getFormatedDate(now);
                break;
            case 'Monthly':
                let tempDateMonthly = new Date();
                tempDateMonthly = tempDateMonthly.setDate(tempDateMonthly.getDate() - (now.getDate() - 1));
                visitDate = DateUtils.getFormatedDate(tempDateMonthly);
                break;
            case 'Yearly':
                let tempDateYearly = new Date();
                tempDateYearly = tempDateYearly.setFullYear(tempDateYearly.getFullYear(), 0, 1);
                visitDate = DateUtils.getFormatedDate(tempDateYearly);
                break;
        }
        let connection = await DB.getInstance();
        let sql = "select COUNT(MV.ID) as PERFORMED_VISITS " +
            "from MERCHANDIZER_VISIT MV " +
            "         INNER JOIN GENERATED_VISITS GV on MV.GEN_VISIT_ID = GV.ID " +
            "WHERE MERCHANDISER_ID = :MECHANDISER_ID " +
            "  AND VISIT_DATE >= TO_DATE(:VISIT_DATE, 'MM/DD/YYYY')";
        let binds = {
            MECHANDISER_ID: merchandiserID,
            VISIT_DATE: visitDate
        };

        let result = await connection.execute(sql, binds, DB.defaultOption);
        return result.rows[0].PERFORMED_VISITS;
    }


    static async getAssignedTargets(merchandiserID, frequency) {
        let now = new Date();
        let visitDate;
        switch (frequency) {
            case 'Daily':
                visitDate = DateUtils.getFormatedDate(now);
                break;
            case 'Monthly':
                let tempDateMonthly = new Date();
                tempDateMonthly = tempDateMonthly.setDate(tempDateMonthly.getDate() - (now.getDate() - 1));
                visitDate = DateUtils.getFormatedDate(tempDateMonthly);
                break;
            case 'Yearly':
                let tempDateYearly = new Date();
                tempDateYearly = tempDateYearly.setFullYear(tempDateYearly.getFullYear(), 0, 1);
                visitDate = DateUtils.getFormatedDate(tempDateYearly);
                break;
        }
        let connection = await DB.getInstance();
        let sql = "select SUM(UNITS) AS ASSIGNED_UNITS " +
            "from SALES_TARGETS " +
            "WHERE MERCHANDISER_ID = :MECHANDISER_ID " +
            "  AND TARGET_MONTH >= TO_DATE(:VISIT_DATE, 'MM/DD/YYYY')";
        let binds = {
            MECHANDISER_ID: merchandiserID,
            VISIT_DATE: visitDate
        };

        let result = await connection.execute(sql, binds, DB.defaultOption);
        return result.rows[0].ASSIGNED_UNITS;
    }
}

module.exports = TargetUtils;
