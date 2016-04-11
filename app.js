(function() {
    var addEvent = function(element, type, handle) {
        if (element.addEventListener) {
            element.addEventListener(type, handle, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handle);
        } else {
            element['on' + type] = handle;
        }
    }

    // 储存数据
    var data = {};

    /**
     
    {
        'label': 'xxx',
        
        // 1
        'type': 'text',
        'validator': 'xxx',
        'rules': 'xxx',
        'success': 'xxx',
        'error': 'xxx'
        
        // 2 
        'type': 'radio',
        'validator': 'xxx',
        'radioContent': {}a:'选项1', b:'选项2', c:'选项3'},
        
        // 3
        'type': 'multi',
        'validator': 'xxx',
        'multiContent': {a:'选项1', b:'选项2', c:'选项3'}
        
    }
    
     */

    var buildFormButtonNode = document.getElementById('build-form');
    var deleteFormButtonNode = document.getElementById('delete-form');

    var labelNode = document.getElementsByName('label')[0];
    var typeNode = document.getElementsByName('type');
    var validatorNode = document.getElementsByName('validator');
    var rulesNode = document.getElementsByName('rules')[0];
    var successNode = document.getElementsByName('success')[0];
    var failNode = document.getElementsByName('fail')[0];
    var deleteNameNode = document.getElementsByName('delete-name')[0];

    var buildNode = document.getElementById('build');


    var radioInputNode = document.getElementById('radio-input');

    // 展示或者隐藏 验证规则，提示，通过提示和失败提示
    var changeOtherStyleDisplay = function(status) {

        validatorNode[0].parentNode.style.display = status;
        rulesNode.parentNode.style.display = status;
        successNode.parentNode.style.display = status;
        failNode.parentNode.style.display = status;

    }

    // 单选或多选的时候增加选项
    var changeRadioStyleDisplay = function(status) {
        if (status === 'block') {
            // 增加单多选选项
            var str = '<div class="form-group">\
                    <label for="a">选项A</label>\
                    <input type="text" name="a">\
                </div>';
            str += '<div class="form-group">\
                    <label for="b">选项B</label>\
                    <input type="text" name="b">\
                </div>';
            str += '<div class="form-group">\
                    <label for="c">选项C</label>\
                    <input type="text" name="c">\
                </div>';
            radioInputNode.innerHTML = str;

        } else if (status === 'none') {
            // 删除单多选选项
            radioInputNode.innerHTML = '';
        }

    }

    // 为选项委托事件
    var addRadioInputEvent = function() {

        // 委托事件，keyup 事件用的应该不是很好，但是不清楚哪个比较好
        addEvent(radioInputNode, 'keyup', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName.toLowerCase() === 'input') {
                console.log(target);
                data['radioContent'][target.name] = target.value;

                console.log(data);
            }
        })
    }

    var addOtherInputEvent = function() {
        for (var _i = 0; _i < validatorNode.length; _i++) {
            (function(_i) {
                addEvent(validatorNode[_i], 'click', function() {
                    console.log(validatorNode[_i])
                    data['validator'] = validatorNode[_i].value;

                });
            })(_i);
        }


        addEvent(rulesNode, 'blur', function() {
            data['rules'] = rulesNode.value;

        });

        addEvent(successNode, 'blur', function() {
            data['success'] = successNode.value;

        });

        addEvent(failNode, 'blur', function() {
            data['fail'] = failNode.value;

        });

    }
    
    // 页面初始化的时候绑定事件
    var eventHandle = function() {

        // 为生成表单按钮添加事件， 按照 data 数据生成表单 
        addEvent(buildFormButtonNode, 'click', function() {
            console.log('click the submit button');
        });

        // 为删除表单按钮添加事件， 按照 data 数据生成表单
        addEvent(deleteFormButtonNode, 'click', function() {
            console.log('click the delete button');
        });

        // 给名称 label 添加事件
        // 填充 label 属性
        addEvent(labelNode, 'blur', function() {
            data['label'] = labelNode.value;
            console.log(data)
        });

        addOtherInputEvent();
        
        // 给类型 type 添加事件 —— 普通文本,单选,多选
        for (var i = 0, l = typeNode.length; i < l; i++) {
            (function(i) {
                addEvent(typeNode[i], 'click', function() {

                    // 填充 type 属性
                    data['type'] = typeNode[i].value;
                    // console.log(data);

                    if (data['type'] !== 'text') {

                        // 添加选项
                        changeRadioStyleDisplay('block');

                        //隐藏无用Input
                        changeOtherStyleDisplay('none');

                        // 初始化 radioContent 属性
                        data['radioContent'] = {};

                        // 删除 validator, rules, success, error
                        delete data['validator'];
                        delete data['rules'];
                        delete data['success'];
                        delete data['error'];

                        // 为添加的选项委托事件
                        addRadioInputEvent();


                        console.log(data);
                    } else {

                        // 展示有用选项
                        changeOtherStyleDisplay('block');

                        // 删除选项 ABC
                        changeRadioStyleDisplay('none');

                        // 删除 radioContent 属性
                        delete data['radioContent'];

                        // 为其他选项委托事件
                        addOtherInputEvent();
                        console.log(data);

                    }
                })

            })(i);

        }

    }

    var init = function() {
        eventHandle();
       
        setInterval(function(){
            console.log(data);
        }, 1000)
        
    }

    init();

})();