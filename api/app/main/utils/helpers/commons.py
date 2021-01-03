import sys, traceback

def get_trace():
    """
    This method will just print the trace-back

    """
    print("Exception in code:")
    print("-"*60)
    traceback.print_exc(file=sys.stdout)
    print("-"*60)

