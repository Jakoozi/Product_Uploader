import React, { Component } from "react";
import { Tag, Input, Tooltip, Icon } from 'antd';


export default class EditableTagGroup extends Component {
    
    state = {
      // tags: ['Tag 2'],
      data : {name: ""},
      inputVisible: false,
      inputValue: '',
    };
  
    handleClose = removedTag => {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.setState({ tags });
    };
  
    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };
    inputReturner = () => {
      let value = this.state.inputValue;
      return value;
    }

  
    handleInputChange = e => {
      this.setState({ inputValue: e.target.value });
      console.log(this.state.inputValue, `input value is consoled`)
    };
  
    handleInputConfirm = () => {
      const { inputValue } = this.state;
      this.props.addTags(inputValue)
    };
  
    saveInputRef = input => (this.input = input);
  
    render() {
      // const { tags, inputVisible, inputValue } = this.state;
      const { inputVisible, inputValue } = this.state;
      const { tags } = this.props;
      return (
        <div>
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" /> New Tag
            </Tag>
          )}
        </div>
      );
    }
  }
  

  
 