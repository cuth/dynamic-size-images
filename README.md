DynamicWidthImgAttrs
====================

Use the size of the element to assign images from paths in attributes. This requires jQuery. Assign in javascript the attributes that will be used for each element width or height.

```javascript
new DynamicSizeImages('.selector', [
    {
        attrName: 'data-src-small',
        size: 200
    },
    {
        attrName: 'data-src-medium',
        size: 350
    },
    {
        attrName: 'data-src-large',
        size: 500
    },
    {
        attrName: 'data-src-xlarge'
    }
], {
    measure: 'width', // either 'width' or 'height'
    operator: '<=', // '<', '>', '<=', or '>='
    debounceTime: 150, // time it waits after browser resize
    checkOnWinLoad: false // measure sizes after window onload
});
```

Helpful CSS
```css
img {
    visibility: hidden;
}
img[src] {
    visibility: visible;
}
```