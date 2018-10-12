from setuptools import setup

setup(
    name='colorrandomizer',
    packages=['colorrandomizer'],
    include_package_data=True,
    install_requires=[
        'Flask',
        'Flask-PyMongo'
    ],
)