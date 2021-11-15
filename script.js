const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const testStringForm = $('.form-string')
const totalCasesIp = $('.quantity-input')
const testStringIp = $('.string-input')
const errorMsg = $('.show-error-msg')
const inputRemain = $('.count-remain-input')
const result = $('.checked-result')
const resetBtn = $('.reset-btn')
const acceptedLettersArr = ['a', 'A', 'b', 'B', 'c', 'C']
let totalTestCases = 0
let checkedCases = 0
let letterArr = []
let isOK = false

totalCasesIp.onkeyup = function(e) {
    errorMsg.innerText = ''
    errorMsg.classList.remove('invalid')

    if (e.keyCode === 13) {
        const caseCount = parseInt(e.target.value)
        if (caseCount >= 1 && caseCount <= 1000) {
            totalTestCases = caseCount
            openTestForm()
        } else {
            e.target.value = ''
            errorMsg.innerText = 'Vui lòng nhập giá trị từ 1 đến 1000'
            errorMsg.classList.add('invalid')
        }
    }
}

testStringIp.onkeyup = function(e) {
    inputRemain.innerText = ''
    inputRemain.classList.remove('invalid')

    const typedString = e.target.value
    checkPossibleIp(typedString)
    if (e.keyCode === 13) {
        testStringIp.value = ''
        if (isOK) {
            checkedCases++
            checkResult(letterArr, typedString)
        } else {
            inputRemain.innerText = 'Vui lòng nhập vào chuỗi kí tự chứa \'A\' \'B\' \'C\''
            inputRemain.classList.add('invalid')
        }
    }
}

function openTestForm() {
    inputRemain.innerText = `Số lần kiểm tra còn lại: ${totalTestCases} lần`
    totalCasesIp.disabled = true
    testStringForm.classList.remove('invisible')
    testStringIp.focus()
}

function checkPossibleIp (stringValue) {
    letterArr = stringValue.split('')
    const isPossibleIp = letterArr.every(x => acceptedLettersArr.includes(x))
    if (!isPossibleIp) {
        testStringIp.value = stringValue.slice(0, -1)
        letterArr.pop()
        inputRemain.innerText = 'Vui lòng chỉ nhập các kí tự \'A\' \'B\' \'C\''
        inputRemain.classList.add('invalid')
    }
    isOK = (isPossibleIp && stringValue !== '')
}

function checkResult(letterArray, typedString) {
    if (checkedCases !== totalTestCases) {
        const needTyping = totalTestCases - checkedCases
        inputRemain.innerText = `Số lần kiểm tra còn lại: ${needTyping} lần`
    } else {
        testStringIp.disabled = true
    }
    
    let bPoints = acPoints = 0
    letterArray.forEach(letter => {
        switch (letter) {
            case 'b' :
            case 'B' :
                bPoints ++
                break
            case 'a' :
            case 'A' :
            case 'c' :
            case 'C' :
                acPoints ++
                break
        }
        result.classList.remove('invisible')
        result.innerText = bPoints === acPoints ? 
            `Có thể chuyển "${typedString.toUpperCase()}" thành chuỗi rỗng` :
            `Không thể chuyển "${typedString.toUpperCase()}" thành chuỗi rỗng`
    })
}

resetBtn.onclick = function() {
    // reset variables
    totalTestCases = 0
    checkedCases = 0
    letterArr = []
    isOK = false

    // restart total case input field
    totalCasesIp.disabled = false
    totalCasesIp.focus()
    totalCasesIp.value = ''
    errorMsg.innerText = ''
    errorMsg.classList.remove('invalid')

    // close test string form and hide result element
    testStringForm.classList.add('invisible')
    testStringIp.disabled = false
    testStringIp.value = ''
    inputRemain.classList.remove('invalid')
    result.classList.add('invisible')
}