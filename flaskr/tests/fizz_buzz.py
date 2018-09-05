def fizz_buzz(value):
    if (is_multiple(value, 3) and is_multiple(value, 5)):
        return "FizzBuzz"
    if (is_multiple(value, 3)):
        return "Fizz"
    elif (is_multiple(value, 5)):
        return "Buzz"

    return str(value)

def is_multiple(value, mod):
      return (value % mod == 0)
