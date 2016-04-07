(function() {
    var addEvent = function(element, type, handle) {
        if(element.addEventListener) {
            element.addEventListener(type, handle, false);
        } else if(element.attachEvent) {
            element.attachEvent('on'+type, handle);
        } else {
            element['on'+type] = handle;
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
    var typeNode = document.getElementsByName ('type');
    var validatorNode = document.getElementsByName('validator');
    var rulesNode = document.getElementsByName('rules')[0];
    var successNode = document.getElementsByName('success')[0];
    var failNode = document.getElementsByName('fail')[0];
    var deleteNameNode = document.getElementsByName('delete-name')[0];
    
    var buildNode = document.getElementById('build');
    
    
    var radioInputNode = document.getElementById('radio-input');
    
    // 展示或者隐藏 验证规则，提示，通过提示和失败提示
    var changeStyleDisplay = function(status) {
        validatorNode[0].parentNode.style.display = status;
        rulesNode.parentNode.style.display = status;
        successNode.parentNode.style.display = status;
        failNode.parentNode.style.display = status;
    }
    
    // 单选或多选的时候增加选项
    var addRadio = function() {
        // 隐藏无用选项
        changeStyleDisplay('none');
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
    }
    
    // 为选项委托事件
    var addRadioInoutEvent = function() {
        console.log(111);
        addEvent(radioInputNode, 'blur', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() === 'input') {
                data['radioContent'][target.name] = target.value;
            }
        })
    }
    
    // 页面初始化的时候绑定事件
    var eventHandle = function() {
        
        // 为生成表单按钮添加事件， 按照 data 数据生成表单 
        addEvent(buildFormButtonNode, 'click', function () {
            
        });
        
        // 为删除表单按钮添加事件， 按照 data 数据生成表单
        addEvent(deleteFormButtonNode, 'click', function () {
           console.log('xxx') 
        });
        
        // 给名称 label 添加事件
        addEvent(labelNode, 'blur', function () {
           data['label'] = labelNode.value;
           console.log(data)
        });
        
        // 给类型 type 添加事件
        for(var i = 0, l = typeNode.length; i < l; i++) {
            (function(i) {
                addEvent(typeNode[i], 'click', function() {
                    data['type'] = typeNode[i].value;
                    // console.log(data);
                    if(data['type'] !== 'text') {
                        // 添加选项
                        addRadio();
                        data['radioContent'] = [];
                        // 为添加的选项委托事件
                        addRadioInoutEvent();
                    } else {
                        changeStyleDisplay('block');
                    }
                })    
            })(i);
            
        }
        
    }
    
    var init = function() {
        eventHandle();
    }
    
    init();
    
})();