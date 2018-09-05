import pytest
import fizz_buzz as f


def check_fizz_buzz(value, expected_val):
    return_val = f.fizz_buzz(value)
    assert return_val == expected_val
    

def test_fizz_buzz_1():
    check_fizz_buzz(1, "1")


def test_fizz_buzz_2():
    check_fizz_buzz(2, "2")


def test_fizz_buzz_3():
    check_fizz_buzz(3, "Fizz")


def test_fizz_buzz_5():
    check_fizz_buzz(5, "Buzz")


def test_fizz_buzz_6():
    check_fizz_buzz(6, "Fizz")


def test_fizz_buzz_10():
    check_fizz_buzz(10, "Buzz")


def test_fizz_buzz_15():
    check_fizz_buzz(15, "FizzBuzz")
