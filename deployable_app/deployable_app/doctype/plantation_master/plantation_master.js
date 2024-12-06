// Copyright (c) 2024, v and contributors
// For license information, please see license.txt

frappe.ui.form.on("Plantation Master", {

    farm_master: function(frm) {
        if (frm.doc.farm_master) {
            frappe.db.get_doc('Farm Master', frm.doc.farm_master).then(doc => {
                frm.set_value('farmer_name', doc.farmer_name);
                frm.set_value('village', doc.village);
                frm.set_value('dist', doc.dist);
                frm.set_value('farm_area_in_acres', doc.farm_area_in_acres);
                frm.set_value('soil_type', doc.soil_type);
            });
        }
    },
    crop_master: function(frm) {
        if (frm.doc.crop_master) {
            
            frappe.db.get_doc('Crop Master', frm.doc.crop_master).then(doc => {
                frm.set_value('crop_name', doc.crop_name);
                frm.set_value('crop_variety', doc.crop_variety);
                frm.set_value('maturity_period_in_days', doc.maturity_period_in_days);
                // console.log(doc);
                frm.clear_table("fertilizer_plan")
                doc.fertilizer_suggestions_table.forEach(row => {
                    let suggested_date = frappe.datetime.add_days(frm.doc.plantation_date, row.days);
                    frm.add_child('fertilizer_plan', {
                        dose: row.dose,
                        days: row.days,
                        suggested: suggested_date,
                        fertilizer_name: row.fertilizer_name,
                        quantity: row.quantity,
                        units_of_measure: row.units_of_measure
                    });
                });
                frm.refresh_field('fertilizer_plan');
            });
        }
    }
  


        // farm_master: function(frm) {
        //     if (frm.doc.farm_master) {
        //         frappe.db.get_doc('Farm Master', frm.doc.farm_master).then(doc => {
        //             frm.set_value('farmer_name', doc.farmer_name);
        //             frm.set_value('village', doc.village);
        //             frm.set_value('dist', doc.dist);
        //             frm.set_value('farm_area_in_acres', doc.farm_area_in_acres);
        //             frm.set_value('soil_type', doc.soil_type);
        //         });
        //     }
        // },
        // crop_master: function(frm) {
        //     if (frm.doc.crop_master) {
        //         frappe.db.get_doc('Crop Master', frm.doc.crop_master).then(doc => {
        //             frm.set_value('crop_name', doc.crop_name);
        //             frm.set_value('crop_variety', doc.crop_variety);
        //             frm.set_value('maturity_period_in_days', doc.maturity_period_in_days);
         
        //             frm.add_child('fertilizer_plan',{
        //                 dose:row.dose,
        //                 days:row.days,
        //                 suggested_date: suggested_date,
        //                 fertilizer_name: row.fertilizer_name,
        //                 quantity: row.quantity,
        //                 units_of_measure: row.units_of_measure
        //             })
        //         });
        //     }

            
        // },
        
});
        

    

