({
    doInit : function(component, event, helper) {
        // are there defaults for this datatype?

        console.log(component.get("v.allModels"));

        let dataType = component.get("v.dataType");
        let models = [];
        if (dataType === 'image'){
            models.push({ id: "GeneralImageClassifier", label: "プリビルド - General Image Classifier" });
            models.push({ id: "FoodImageClassifier", label: "プリビルド - Food Image Classifier" });
            models.push({ id: "SceneClassifier", label: "プリビルド - Scene Image Classifier" });
        } else if (dataType === 'text-sentiment'){
            models.push({ id: "CommunitySentiment", label: "プリビルド - Community Sentiment" });
        } else if (dataType === 'image-multi-label') {
            models.push({ id: "MultiLabelImageClassifier", label: "プリビルド - Multi-Label Image Classifier" });
        }

        // add any custom models to the default if they exist
        if (component.get("v.allModels")[dataType] && component.get("v.allModels")[dataType].length>0){
            models = models.concat(component.get("v.allModels")[dataType]);
        }

        // if there are any models, make the first one selected
        if (models.length>0){
            models[0].selected = true;
            component.set("v.modelId", models[0].id);
        }
        component.set("v.selectionModels", models);

    },

    valueChanged : function(component, event, helper) {
        component.set("v.modelId", component.find("selectModel").get("v.value"));
    },

})
